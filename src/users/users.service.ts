import { ConflictException, Injectable } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

function omitPassword<T extends { password: string }>(user: T) {
  const { password: _password, ...safe } = user;

  return safe;
}

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateUserDto) {
    const email = dto.email.toLowerCase();
    const username = dto.username.toLowerCase();

    if (await this.findUserByEmail(email)) {
      throw new ConflictException('Email already exists');
    }

    if (username && (await this.findUserByUsername(username))) {
      throw new ConflictException('username already taken');
    }

    const user = await this.db.orm.public.User.create({
      ...dto,
      email,
      username,
      password: await bcrypt.hash(dto.password, SALT_ROUNDS),
    });

    return omitPassword(user);
  }

  async findAll() {
    const users = await this.db.orm.public.User.all();
    return users.map(omitPassword);
  }
  async findUserById(userId: number) {
    const user = await this.db.orm.public.User.where({ id: userId }).first();
    return user ? omitPassword(user) : null;
  }

  async findUserByEmail(email: string) {
    return await this.db.orm.public.User.where({
      email: email.toLowerCase(),
    }).first();
  }

  async findUserByUsername(username: string) {
    return await this.db.orm.public.User.where({
      username: username.toLowerCase(),
    }).first();
  }
  async updateUser(userId: number, dto: UpdateUserDto) {
    const data = { ...dto };
    if (dto.email) data.email = dto.email.toLowerCase();
    if (dto.username) data.username = dto.username.toLowerCase();
    if (dto.password)
      data.password = await bcrypt.hash(dto.password, SALT_ROUNDS);

    await this.db.orm.public.User.where({ id: userId }).update(data);

    return this.findUserById(userId);
  }
}
