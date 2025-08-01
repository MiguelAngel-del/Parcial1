import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthService } from './auth/auth.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cookieParser para manejar las cookies de sesión
  app.use(cookieParser());

  // express-session para guardar sesiones en el servidor
  // El secret es como una clave para firmar las cookies
  app.use(
    session({
      secret: 'TU_SECRETO_ALEATORIO', // Este valor debería estar en variables de entorno, asi se quda de momento
      resave: false, // no guarda la sesión si no ha cambiado
      saveUninitialized: false, // no guarda sesiones vacías
      cookie: {
        httpOnly: true, // Para que no se pueda acceder a la cookie desde el frontend
        maxAge: 1000 * 60 * 60, // La sesión dura 1 hora
      },
    }),
  );

  // Aquí le digo a Passport como guardar el usuario en la sesión
  // Solo guardo el idUsuario para no meter todo el objeto
  passport.serializeUser((user: any, done) => {
    done(null, user.idUsuario);
  });

  // Y aquí le digo cómo recuperar el usuario completo desde el ID guardado
  // Uso el AuthService para buscarlo en la base de datos
  passport.deserializeUser(async (id: number, done) => {
    try {
      const authService = app.get(AuthService);
      const user = await authService.findOne(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  // Inicializo Passport para sesiones
  app.use(passport.initialize());
  app.use(passport.session());

  // validaciones globales para los DTOs
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true, transform: true }),
  );

  // configuracion CORS origin: true permite cualquier origen credentials: true permite enviar cookies y headers de autenticación
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });

  // Uso ConfigService para obtener el puerto desde .env
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') || 3001;

  // Configuracion Swagger para documentar la API
  // con autenticación con JWT para probar endpoints protegidos
  const config = new DocumentBuilder()
    .setTitle('Tu API')
    .setDescription('Descripción de la API')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'JWT-auth' // nombre en los controladores @ApiBearerAuth('JWT-auth')
    )
    .build();

  // Creo el documento Swagger y lo monto en /api
  const document = SwaggerModule.createDocument(app, config);

  // Configuro Swagger UI para que recuerde el token JWT entre peticiones
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Middleware para mostrar el header Authorization en consola para manejo de errores
  app.use((req, res, next) => {
    console.log('🔍 Authorization Header:', req.headers.authorization);
    next();
  });

  await app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Swagger UI: http://localhost:${port}/api`);
  });
}

bootstrap();
