import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/common/decorators/user.decorator';
import { ChannelChats } from 'src/entities/ChannelChats';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { DMs } from 'src/entities/DMs';
import { Mentions } from 'src/entities/Mentions';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { EntitySchema } from 'typeorm';
import { DmsController } from './dms.controller';
import { DmsService } from './dms.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChannelChats, Users, ChannelMembers, Channels, DMs, WorkspaceMembers, Workspaces, Mentions])],
  providers: [DmsService],
  controllers: [DmsController],
})
export class DmsModule { }
