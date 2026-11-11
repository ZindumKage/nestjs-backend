import { db } from '../prisma/db';

export async function createEnrollment(userId: number, courseId: number) {
  return await db.orm.public.Enrollment.create({
    userId: userId,
    courseId: courseId,
  });
}

export async function getAllEnrollment() {
  return await db.orm.public.Enrollment.all();
}

export async function findEnrollmentByUserId(userId: number) {
  return await db.orm.public.Enrollment.where({
    userId: userId,
  }).first();
}

export async function updateEnrollment(userId: number, courseId: number) {
  return await db.orm.public.Enrollment.where({
    userId: userId,
  }).update({
    courseId: courseId,
  });
}
