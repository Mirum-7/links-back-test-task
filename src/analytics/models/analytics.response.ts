import { Clicks } from '@prisma/client';

export interface ClicksAnalyticsResponse {
  count: number;
  clicks: Clicks[];
}
