import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerMiddleware } from './middlewares/logger,middleware';
import { UsersModule } from './users/users.module';
import { DmsService } from './dms/dms.service';
import { DmsController } from './dms/dms.controller';
import { DmsModule } from './dms/dms.module';
import { ChannelsModule } from './channels/channels.module';
import { WorkspacesModule } from './workspaces/workspaces.module';
@Module({
  imports: [ConfigModule.forRoot(), UsersModule, DmsModule, ChannelsModule, WorkspacesModule],
  controllers: [AppController, DmsController],
  providers: [AppService, DmsService],
})
export class AppModule implements NestModule{

configure(consumer:MiddlewareConsumer) :any{

  consumer.apply(LoggerMiddleware).forRoutes('*');

}

}
