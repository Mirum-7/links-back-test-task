import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get(':shortUrl')
  getAnalytics(
    @Param('shortUrl') shortUrl: string,
    @Query('last', new ParseIntPipe({ optional: true })) lastCount: number = 5,
  ) {
    return this.analyticsService.getClickAnalytics(shortUrl, lastCount);
  }
}
