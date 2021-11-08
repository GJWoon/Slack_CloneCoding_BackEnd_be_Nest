import { Controller, Get, Post, Req, Res, Body, UseInterceptors, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiResponse } from '@nestjs/swagger'; import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';
import { UndefinedToNullInterceptor } from '../common/Interceptors/undefinedToNull.interceptor';
import UserDto from "../common/dto/user.dto,";
import { LocalAuthGuard } from "src/auth/local-auth.guard";

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
  constructor(private userService: UsersService) { }
  @Get()
  getUsers(@Req() req) {
    return;
  }

  @ApiOperation({
    description: '회원가입',
    summary: '회원가입'
  })
  @Post()
  async postUsers(@Body() dto: JoinRequestDto) {
    await this.userService.postUsers(dto.email, dto.nickname, dto.password);
  }
  @ApiResponse({
    description: '성공',
    status: 200,
    type: UserDto,
  })
  @ApiResponse({
    description: '서버 에러',
    status: 500,
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() data: JoinRequestDto) {
    return "Y";
  }
  @Post('/logout')
  logout(@Req() req, @Res() res) {
    req.logount();
    res.clearCookie('connect.cid', { httpOnly: true });
    res.send('ok');
  }

  //test
  @Post('/test')
  resisterTest(@Body() dto: JoinRequestDto) {

    this.userService.resisterUser(dto);
  }

}
