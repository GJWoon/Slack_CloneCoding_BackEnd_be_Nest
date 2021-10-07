import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import{Request,Response,NextFunction} from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware{


    private logger = new Logger('HTTP')
    // context를 지정해주면 어떤 콘솔로그인지 알려준다 


    //Express middleware


use(request : Request,response:Response,next:NextFunction):void{

const {ip ,method,originalUrl} = request;

const userAgent = request.get('user-agent') || '';


response.on('finish',()=> {

const{statusCode} = response;
const contentLength = response.get('content-length');

this.logger.log(
    `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`
)

});

next();

}


}

