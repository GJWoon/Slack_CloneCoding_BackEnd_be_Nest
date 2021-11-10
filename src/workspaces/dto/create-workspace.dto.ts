import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, isNotEmpty, IsString } from "class-validator";

export class CreateWorkSpaceDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'sleact',
        description:'워크 스페이스명'
    })
    public workspace:string;
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description:'url address',
        example: 'sleact'
    })
    public url:string;
}