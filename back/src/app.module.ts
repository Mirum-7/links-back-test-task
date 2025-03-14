import { Module } from '@nestjs/common';
import { AnalyticsModule } from './analytics/analytics.module';
import { ClicksModule } from './clicks/clicks.module';
import { LinksModule } from './links/links.module';
import { ScheduleModule } from './schedule/schedule.module';

@Module({
  imports: [LinksModule, ScheduleModule, AnalyticsModule, ClicksModule],
})
export class AppModule {}
