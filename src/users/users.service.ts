import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_CONNECTION } from '../database/database.module';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: any) {}

  async create(createUserDto: CreateUserDto) {
    return await this.db.orm.public.User.create({
      ...createUserDto,
    });
  }

  async findAll() {
    return await this.db.orm.public.User.all();
  }

  async findUserById(userId: number) {
    return await this.db.orm.public.User.where({ id: userId }).first();
  }
  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    return await this.db.orm.public.User.where({ id: userId }).update({
      ...updateUserDto,
    });
  }
}
