import { Controller, Get, Post, Req, Res,Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
@Controller('api/users')
export class UsersController {

    constructor(private userService:UsersService){
    }
    @Get()
    getUsers(@Req()req){

        return 
    }
    @Post()
    postUsers(){

    }
    @ApiOperation({summary:'로그인'})
    @Post("/login")
    login(@Body()data:JoinRequestDto){

        this.userService.postUsers(data.emaul,data.nickName,data.password)

    }
    @Post("/logout")
    logout(@Req()req,@Res() res){

                req.logount();
                res.clearCookie('connect.cid',{httpOnly:true});
                res.send('ok');    

    }
}
