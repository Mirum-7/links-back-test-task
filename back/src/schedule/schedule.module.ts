import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [PrismaModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
