import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Channel')
@Controller('channels')
export class ChannelsController {

    @Get('name/channels')
    getChannels(@Param('name') name: string) {
    }
    @Post()
    createChannel(@Body() body) {
    }
    @Get(':name/members')
    getMembers(@Query() query) {
    }
}
