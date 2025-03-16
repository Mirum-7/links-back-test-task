import { Clicks } from '@prisma/client';

export interface ClicksAnalyticsResponse {
  clicksCount: number;
  clicks: Clicks[];
}
