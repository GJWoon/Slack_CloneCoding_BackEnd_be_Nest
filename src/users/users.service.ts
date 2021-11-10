import { HttpException, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository, QueryRunner, Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoggerMiddleware } from 'src/middlewares/logger,middleware';
import { JoinRequestDto } from './dto/join.request.dto';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { error } from 'console';
@Injectable()
export class UsersService {


    constructor(@InjectRepository(Users) private userRepository: Repository<Users>,
                @InjectRepository(WorkspaceMembers) private workspaceRepository:Repository<WorkspaceMembers>,
                @InjectRepository(ChannelMembers) private channelMembersRepository:Repository<ChannelMembers>,
                private connection:Connection
    ) { }

    async postUsers(email: string, nickName: string, password: string) {

        console.log(email);
        console.log(nickName);
        console.log(password);

        const queryRunner:QueryRunner =  this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        const user = await queryRunner.manager.getRepository(Users).findOne({ where: { email } });
        console.log( 'userInfo', user ?? 'null user');
        if (user) {
            // user가 이미 존재한다면 Error
            throw new HttpException('이미 존재하는 사용자입니다.', 500);
        }
        const hashPassword: string = await bcrypt.hash(password, 12);
        let newUser: Users = new Users(email, nickName, hashPassword);
        // await this.userRepository.save({ email, nickName, hashPassword });
        try{
            const returnUser : Users = await queryRunner.manager.getRepository(Users).save(newUser);
            await queryRunner.manager.getRepository(WorkspaceMembers).save({
                UserId : returnUser.id,
                WorkspaceId: 1,
            });
            await queryRunner.manager.getRepository(ChannelMembers).save({
             UserId : returnUser.id,
             ChannelId:1
            });

           await queryRunner.commitTransaction();
        }catch(error){

            await queryRunner.rollbackTransaction();

        }finally{
            await queryRunner.release();
        }
 
       return true;
    } 

    async resisterUser(dto: JoinRequestDto) {

        const email = dto.email;

        const user: Users = await this.userRepository.findOne({ where: { email } })

        console.log(user.nickname);

        if (user) {
            throw new Error('이미 존재하는 유저입니다.')
        }

        //const saveUser : Users = new Users(JoinRequestDto);




    }


}
