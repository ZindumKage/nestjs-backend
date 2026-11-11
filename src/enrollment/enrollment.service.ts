import { Injectable } from '@nestjs/common';
import {
  createEnrollment,
  findEnrollmentByUserId,
  getAllEnrollment,
  updateEnrollment,
} from './enrollment.queries';

@Injectable()
export class EnrollmentService {
  async create(userId: number, courseId: number) {
    return createEnrollment(userId, courseId);
  }

  async findAll() {
    return getAllEnrollment();
  }

  async findByUserId(userId: number) {
    return findEnrollmentByUserId(userId);
  }

  async update(userId: number, courseId: number) {
    return updateEnrollment(userId, courseId);
  }
}
