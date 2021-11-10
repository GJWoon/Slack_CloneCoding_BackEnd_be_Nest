import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Workspaces } from 'src/entities/Workspaces';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';

@Module({
  imports: [TypeOrmModule.forFeature([Users, WorkspaceMembers, ChannelMembers, Workspaces, Channels])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
