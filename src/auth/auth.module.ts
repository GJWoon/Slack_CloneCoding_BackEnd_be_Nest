import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { LocalSerializer } from './local.serializer';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [UsersModule, PassportModule.register({ session: true }), TypeOrmModule.forFeature([Users])],
    providers: [AuthService, LocalStrategy, LocalSerializer],

})
export class AuthModule { }
