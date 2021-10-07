import { Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('WorkSpace')
@Controller('api/workspaces')
export class WorkspacesController {
  @Get()
  getMyWorkSpaces() {}

  @Post()
  createWorkspace() {}
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
