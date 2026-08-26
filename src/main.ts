import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const builder = new DocumentBuilder()
  builder.setTitle('')
  builder.setDescription('Backpulse API description')
  builder.setVersion('')
  const config = builder.build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('api', app, document)


  app.useGlobalPipes( new ValidationPipe(
    {
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }
  ))
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors( new ClassSerializerInterceptor (app.get(Reflector)))
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
