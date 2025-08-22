import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
// Eliminados cookieParser, session y passport
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Eliminada toda la lógica de autenticación y sesiones

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

  // Configuracion Swagger para documentar la API (sin autenticación)
  const config = new DocumentBuilder()
    .setTitle('Tu API')
    .setDescription('Descripción de la API')
    .setVersion('1.0')
    .build();

  // Creo el documento Swagger y lo monto en /api
  const document = SwaggerModule.createDocument(app, config);

  // Configuro Swagger UI para que recuerde el token JWT entre peticiones
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });


  await app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
    console.log(`Swagger UI: http://localhost:${port}/api`);
  });
}

bootstrap();

// Eliminado export innecesario para Next.js