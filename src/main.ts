import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as passport from 'passport';
import { AuthService } from './auth/auth.service';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // cookieParser para manejar las cookies de sesión
  app.use(cookieParser());

  // express-session para guardar sesiones en el servidor
  // El secret es como una clave para firmar las cookies
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'TU_SECRETO_ALEATORIO',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60,
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

  // configuracion CORS: solo permite los orígenes válidos
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://grupo2-frontend.onrender.com',
    ],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
  });

  // Servir archivos estáticos en /uploads
  app.use('/uploads', require('express').static(join(__dirname, '..', 'uploads')));
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

module.exports = {
  images: {
    domains: ['grupo2-backend-k0b9.onrender.com'],
  },
}