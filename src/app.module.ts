
import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/Users';
import { ChannelChats } from './entities/ChannelChats'
import { ChannelMembers } from './entities/ChannelMembers'
import { Channels } from './entities/Channels'
import { DMs } from './entities/DMs'
import { Mentions } from './entities/Mentions'
import { WorkspaceMembers } from './entities/WorkspaceMembers'
import { Workspaces } from './entities/Workspaces'
import { join } from 'path';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { AuthModule } from './auth/auth.module';

Logger.log(`--------${join(__dirname, '../', 'src', 'entities', '*.{ts,js}')}-------`)

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    DmsModule,
    ChannelsModule,
    WorkspacesModule,
    TypeOrmModule.forFeature([Users,WorkspaceMembers,ChannelMembers]),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      logging: true,
      //entities: ['../**/*.entities1.{ts,js}'],
      //entities: ["dist/**/*.entities1{.ts,.js}"],

      //entities: ['./entities1/*.*'],
      //entities: [Users, ChannelChats, ChannelMembers, Channels, DMs, Mentions, WorkspaceMembers, Workspaces],
      synchronize: false,
    }),
    AuthModule
  ],
  controllers: [AppController, DmsController, UsersController],
  providers: [AppService, DmsService, UsersService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

