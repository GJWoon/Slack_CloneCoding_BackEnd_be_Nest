import { HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from "src/entities/Users";
import { Repository } from "typeorm";
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(Users) private userRepository: Repository<Users>) { }

    async validateUser(email: string, password: string) {


        console.log('hi here')
        // email로 user를 찾는다
        const users: Users = await this.userRepository.findOne({
            where: { email },
        })
        // user가 null일 경우 Exception을 발생 시킨다.
        if (!users) {
            console.log('유저가 없다')
            throw new HttpException('해당 유저가 존재하지 않습니다.', 401);
        }
        // bcrypt로 인코딩된 user의 비밀번호와 인자로 받은 비밀번호를 비교한다.
        const resultPasswordBoollean: boolean = await bcrypt.compare(password, users.password)
        // 결과값이 참일 경우 client로 비밀번호를 제외한 user의 정보를 보내준다.
        if (resultPasswordBoollean) {
            const { password, ...rest } = users;
            return rest;
        } else {
            throw new HttpException('not match Id or Password ', 500);
        }
        return null;
    }

}