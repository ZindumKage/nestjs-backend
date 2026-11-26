import { Injectable } from '@nestjs/common';
import { db } from '../prisma/db';

@Injectable()
export class DatabaseService {
  readonly db = db;
  get orm() {
    return db.orm;
  }
}
