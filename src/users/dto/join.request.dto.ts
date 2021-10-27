import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'


export class JoinRequestDto {

    @ApiProperty({
        example: 'zerohch0@gmail.com',
        description: '이메일',
    })
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '제로초',
        description: '닉네임',
    })
    public nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'nodejsbook',
        description: '비밀번호',
    })
    public password: string;
}