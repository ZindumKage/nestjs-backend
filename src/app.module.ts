import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EnrollmentModule } from './enrollment/enrollment.module.js';


@Module({
  imports: [EnrollmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
