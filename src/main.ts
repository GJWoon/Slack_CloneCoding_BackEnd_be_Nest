import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './httpException.filter';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';
declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  let config: Omit<OpenAPIObject, 'paths'>;
  // eslint-disable-next-line prefer-const
  config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();
  app.useGlobalPipes(new ValidationPipe());
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(passport.initialize());
  app.use(session({
    resave: false,
    saveUninitialized: false,
    cookie: {

      httpOnly: true,
    },
    secret: "secret"
  }));
  app.use(passport.session());
  app.use(cookieParser());
  //env 파일에 있는 PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);
  app.useGlobalFilters(new HttpExceptionFilter());
  console.log('Server Port ' + port);

  if (module.hot) {
    // new !
    module.hot.accept(); // new !
    module.hot.dispose(() => app.close()); // new !
  }
}
bootstrap();
