import { Controller, Get, Post, Req, Res, Body, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from 'src/common/dto/user.dto,';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { UndefinedToNullInterceptor } from '../common/Interceptors/undefinedToNull.interceptor';

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Get()
  getUsers(@Req() req) {
    return;
  }
  @Post()
  postUsers() {}

  @ApiResponse({
    description: '성공',
    status: 200,
    type: UserDto,
  })
  @ApiResponse({
    description: '서버 에러',
    status: 500,
  })
  @ApiOperation({ summary: '로그인' })
  @Post('/login')
  login(@Body() data: JoinRequestDto) {
    this.userService.postUsers(data.emaul, data.nickName, data.password);
  }
  @Post('/logout')
  logout(@Req() req, @Res() res) {
    req.logount();
    res.clearCookie('connect.cid', { httpOnly: true });
    res.send('ok');
  }
}
