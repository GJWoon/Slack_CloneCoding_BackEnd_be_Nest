import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Users } from "src/entities/Users";
import { AuthService } from "./auth.service";
import {Strategy} from 'passport-local';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService:AuthService){
    super({usernameField:'email',passwordField:'password'})
    }
    async validate(email:string,password:string,done:CallableFunction){
        
        const user = await this.authService.validateUser(email,password);
    
        return done(null,user);
    }

}