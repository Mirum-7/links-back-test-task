import { Module } from '@nestjs/common';
import { ScheduleModule as SchedulerModule } from '@nestjs/schedule';
import { LinksModule } from './links/links.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [SchedulerModule.forRoot(), LinksModule, ScheduleModule],
})
export class AppModule {}
