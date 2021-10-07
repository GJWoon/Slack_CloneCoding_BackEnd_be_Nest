import { Controller, Delete, Get, Post } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {


@Get()
getMyWorkSpaces(){}

@Post()
createWorkspace(){

}
@Get(':url/members')
getAllMembersFromWorkspace(){}

@Post(':url/members')
inviteMembersToWorksapce(){}

@Delete(':url/members/:id')
kickMemberFromWorkspace(){

}

}
