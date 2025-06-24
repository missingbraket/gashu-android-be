import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS 허용
  app.enableCors();

  // 유효성 검사 파이프 전역 적용
  app.useGlobalPipes(new ValidationPipe());

  // 스웨거
  const config = new DocumentBuilder()
    .setTitle('Bus API')
    .setDescription('버스 도착정보 API')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // http://localhost:3000/api


  await app.listen(3000);
  console.log(`🚀 Server running on http://localhost:3000`);
}
bootstrap();

