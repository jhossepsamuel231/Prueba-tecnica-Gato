import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { GlobalHttpExceptionFilter } from './shared/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { SeederService } from './shared/seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Financiera')
    .setDescription('Documentación de endpoints de cuentas y transacciones')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalFilters(new GlobalHttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const seeder = app.get(SeederService);
  await seeder.run();
  await app.listen(3000);
}
bootstrap();
