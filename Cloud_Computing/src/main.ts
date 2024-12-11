import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors : {
    origin : "*"
  }});

  // Enable global validation
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const prisma = new PrismaClient()

  const adminCount = await prisma.user.count({
    where: {
      role: 'ADMIN',
    },
  })


  if(adminCount == 0) {
    console.log("Make an admin account")
    await prisma.user.create({
      data : {
        email : "galbinadifah43@gmail.com",
        password : hashSync("pass123", 10),
        username : "galbinadifah",
        role : "ADMIN"
      }
    })
  }

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API OptiLans')
    .setDescription('API for OptiLans')
    .setVersion('0.1')
    .addBearerAuth()
    .build();
     
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
