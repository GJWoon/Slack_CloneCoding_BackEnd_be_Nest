import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import APIResponse from 'src/common/dto/api.reponse';
import { Users } from 'src/entities/Users';
import { CreateWorkSpaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WorkSpace')
@Controller('api/workspaces')
export class WorkspacesController {

  constructor(private workSpaceService:WorkspacesService){}
  @Get()
  async getMyWorkSpaces(@User() user:Users) {
    return new APIResponse(await this.workSpaceService.findByUserId(user.id));
  }
  @Post()
  async createWorkspace(@Body() dto:CreateWorkSpaceDto) {
    return this.workSpaceService.
  }
  @Get(':url/members')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getAllMembersFromWorkspace() {}

  @Post(':url/members')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  inviteMembersToWorksapce() {}

  @Delete(':url/members/:id')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  kickMemberFromWorkspace() {}
}
