import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // API prefix
  const apiPrefix = process.env.API_PREFIX || 'api/v1';
  app.setGlobalPrefix(apiPrefix);

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('N-Point System API')
    .setDescription('N-Point System API with dummy data for testing')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'X-API-Key',
        in: 'header',
        description: 'API Key for authentication (use: nxt_live_demo_key_123456789)',
      },
      'api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3001;
  await app.listen(port);

  console.log(`
    🚀 N-Point API Server is running!

    📝 API URL: http://localhost:${port}/${apiPrefix}
    📚 Swagger Docs: http://localhost:${port}/docs
    🔑 API Key: ${process.env.API_KEY}

    Example request:
    curl -X GET http://localhost:${port}/${apiPrefix}/points/balance \\
      -H "X-API-Key: ${process.env.API_KEY}" \\
      -H "X-User-Id: user-001"
  `);
}

bootstrap();
