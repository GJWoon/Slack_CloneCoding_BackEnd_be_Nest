import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChannelChats } from 'src/entities/ChannelChats';
import { Channels } from 'src/entities/Channels';
import { Repository } from 'typeorm';

@Injectable()
export class DmsService {

    constructor(@InjectRepository(Channels) private channelRepository: Repository<Channels>,
                @InjectRepository(ChannelChats) private channelChatRepository:Repository<ChannelChats>
    ) { }

    async postChats(url: string, content: string, myid: number, name: string) {
        const channel: Channels = await this.channelRepository.createQueryBuilder('c')
            .innerJoin('c.WorkSpace',
                'workspace',
                'workspace.url =:url',
                { url: url }
            )
            .where('c.name = :name', { name: name })
            .getOne();

        const chat: ChannelChats = new ChannelChats();
        chat.UserId = myid;
        chat.Channel = channel;
        chat.content = content;
        chat.ChannelId = channel.id;
        await this.channelChatRepository.save(chat);
    }



}
