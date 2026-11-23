import { Injectable } from '@nestjs/common';

import { createEnrollmentDto, updateEnrollmentDto } from './dto/enrollment.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EnrollmentService {
  constructor(private readonly db: DatabaseService) {}

  async create(createEnrollmentDto: createEnrollmentDto) {
    return await this.db.orm.public.Enrollment.create({
      ...createEnrollmentDto,
    });
  }

  async findAll() {
    return await this.db.orm.public.Enrollment.all();
  }

  async findEnrollmentByUserId(userId: number) {
    return await this.db.orm.public.Enrollment.where({
      userId: userId,
    }).first();
  }

  async updateEnrollment(
    userId: number,
    updateEnrollmentDto: updateEnrollmentDto,
  ) {
    return await this.db.orm.public.Enrollment.where({ userId: userId }).update(
      {
        ...updateEnrollmentDto,
      },
    );
  }
}
