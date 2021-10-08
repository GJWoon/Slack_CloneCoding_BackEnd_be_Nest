import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoggerMiddleware } from 'src/middlewares/logger,middleware';
@Injectable()
export class UsersService {


    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }

    async postUsers(email: string, nickName: string, password: string) {

        console.log(email);
        console.log(nickName);
        console.log(password);
        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            // user가 이미 존재한다면 Error
            throw new Error('이미 존재하는 사용자입니다.');
        }
        const hashPassword: string = await bcrypt.hash(password, 12);

        let newUser: Users = new Users(email, nickName, hashPassword);

        // await this.userRepository.save({ email, nickName, hashPassword });
            
        await this.userRepository.save(newUser);

    }

}
