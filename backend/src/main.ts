import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:3000'], // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Para cookies/sessions
  });

  // Pipes globais
  app.useGlobalPipes(new ValidationPipe());

  // Prefixo global da API
  app.setGlobalPrefix('api');

  await app.listen(3001); // Backend na porta 3001;
  console.log('🚀 Backend rodando em http://localhost:3001');
}
bootstrap().catch((err) => {
  console.error('Erro ao iniciar o servidor', err);
  process.exit(1);
});
