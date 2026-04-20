import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // Importa esto

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos esto para que los DTOs (login.dto) funcionen
  app.useGlobalPipes(new ValidationPipe()); 
  
  // Cors es necesario para que el frontend pueda hablar con el backend
  app.enableCors();

  await app.listen(3000, '0.0.0.0');
}
bootstrap();