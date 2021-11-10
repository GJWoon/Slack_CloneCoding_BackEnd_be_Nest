import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Channels } from 'src/entities/Channels';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { Workspaces } from 'src/entities/Workspaces';
import { Connection, getConnection, Repository } from 'typeorm';

@Injectable()
export class WorkspacesService {
    constructor(
        @InjectRepository(Workspaces) private workSpaceRepository: Repository<Workspaces>,
        @InjectRepository(Users) private userRepository:Repository<Users>
    ) { }
    async findByIds(id: number) {
        return await this.workSpaceRepository.findByIds([id]);
    }
    async findByUserId(userId: number) {
        return await this.workSpaceRepository.find({
            where: { WorkspaceMembers: [{ UserId: userId }] }
        });
    }
    async createWorkspace(name: string, url: string, myId: number) {
        const queryRunner = getConnection().createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //workspace  만들기
        const workspace: Workspaces = new Workspaces();
        workspace.name = name;
        workspace.url = url;
        workspace.OwnerId = myId;
        //channels member 만들기.
        try {
            await queryRunner.manager.getRepository(Workspaces).save(workspace);
            //workspace member 만들기
            const workspacemembers: WorkspaceMembers = new WorkspaceMembers();
            workspacemembers.UserId = myId;
            workspacemembers.WorkspaceId = workspace.id;
            // channel만들기
            const channel: Channels = new Channels();
            channel.name = '일반';
            channel.WorkspaceId = workspace.id;

           const [,savedChannel] = await Promise.all([
                queryRunner.manager.getRepository(WorkspaceMembers).save(workspacemembers),
                queryRunner.manager.getRepository(Channels).save(channel)
            ]);
            const channelMember:ChannelMembers = new ChannelMembers();
            channelMember.ChannelId = savedChannel.id;
            channelMember.UserId = myId;
            await queryRunner.manager.getRepository(ChannelMembers).save(channelMember);
        } catch (Error) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
        return true;
        // channelmember만들기
    }

    async getWorkspaceMembers(url:string){
        this.userRepository.createQueryBuilder('u')
        .innerJoin('u.WorkspaceMembers','members')
        .innerJoin('members.Workspace','workspace','workspace.url=:url',{url})
        .getMany();
    }

}
