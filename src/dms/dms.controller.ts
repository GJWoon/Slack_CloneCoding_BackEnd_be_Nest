import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { query } from 'express';

@ApiTags('DM')
@Controller('api/dms')
export class DmsController {
  @ApiQuery({
    name: 'perPage',
    required: true,
    description: '한번에 가져오는 갯수',
  })
  @ApiQuery({ name: 'page', required: true, description: '현재 페이지' })
  @Get(':id/chats')
  getChat(@Query() query, @Param() param) {
    console.log(query.page, query.perPage);
    console.log(param.url);
  }

  @Post(':id/chats')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  postChat(@Body() body) {}
}
