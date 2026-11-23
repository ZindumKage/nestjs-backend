import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/user.dto';
import {JwtService} from '@nestjs/jwt';


@Injectable()
export class AuthService {
     constructor( private readonly usersService: UsersService, private readonly jwtService: JwtService ) {}

     async register(dto: CreateUserDto) {
          const user = await this.usersService.create(dto);
          return { user, accessToken: await this.signToken(user.id, user.email)};
     }

    
}
