import { LinksService } from '@/links/links.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly linksService: LinksService) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredLinks() {
    try {
      await this.linksService.deleteExpiredLinks();
    } catch (error) {
      this.logger.error('Failed to remove expired links:', error);
    }
  }
}
