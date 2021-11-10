import { ApiOperation, ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class PostChatDto {


    @IsString()
    @IsNotEmpty()
    @ApiProperty(
        {
            description: 'url'
            , example: 'sleact'
        }
    )
    public url: string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({

        description: '내용',
        example: '채팅내용입니다.'
    })
    public content: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({

        description: '채널이름',
        example: '채널이름!.'
    })
    public name: string;


}