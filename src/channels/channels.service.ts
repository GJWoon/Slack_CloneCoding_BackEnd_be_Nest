import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Channels } from 'src/entities/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class ChannelsService {

    constructor(
        @InjectRepository(Channels) private channelRepository:Repository<Channels>){}
    async findById(id:number){
        return await this.channelRepository.findOne(
            {
                where : {id}
            }
        );
        // 위 코드와 같은 코드
       // return await this.channelRepository.findByIds([id]);
    }
    // request로 받은 url의 workspace와 내가 속한 채널을 가져오는 메서드
    async getMineWorkSpaceChannel(myId:number,url:string){

      return this.channelRepository.createQueryBuilder('c')
        .innerJoinAndSelect(
            'c.ChannelMembers',
            'channelMembers',
            'channelMembers.userId = :myId',
            {myId:myId}
        ).innerJoinAndSelect('channelMembers.WorkSpace'
        ,'WorkSpace'
        ,'WorkSpace.url = :url',
        {url:url}
        )
    }

    

}
