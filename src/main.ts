import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Sleact API')
  .setDescription('Sleact 개발을 위한 API 문서입니다.')
  .setVersion('1.0')
  .addCookieAuth('connect.sid')
  .build();

const document = SwaggerModule.createDocument(app,config)
SwaggerModule.setup('api',app,document);

  //env 파일에 있는 PORT
  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log('Server Port ' + port);

  if (module.hot) { // new !
    module.hot.accept(); // new !
    module.hot.dispose(() => app.close()); // new !
    

  } 

}
bootstrap();
