import { LinksModule } from '@/links/links.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [PrismaModule, LinksModule],
  providers: [ScheduleService],
})
export class ScheduleModule {}
