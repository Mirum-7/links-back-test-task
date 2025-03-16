import { ClicksService } from '@/clicks/clicks.service';
import { LinksService } from '@/links/links.service';
import { Injectable } from '@nestjs/common';
import { ClicksAnalyticsResponse } from './models/analytics.response';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly linksService: LinksService,
    private readonly clicksService: ClicksService,
  ) {}

  async getClickAnalytics(
    linkAlias: string,
    lastCount: number,
  ): Promise<ClicksAnalyticsResponse> {
    const link = await this.linksService.getByAlias(linkAlias);

    // get count of clicks
    const clicksCount = await this.clicksService.getClicksCount(link.id);

    // get last clicks
    const clicks = await this.clicksService.findLastByLinkId(
      link.id,
      lastCount,
    );

    return {
      clicksCount,
      clicks,
    };
  }

  async writeClickAnalytics(linkId: bigint, ip?: string) {
    await this.clicksService.createOne({ linkId, ip });
  }
}
