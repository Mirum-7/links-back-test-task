import { AnalyticsModule } from '@/analytics/analytics.module';
import { PrismaModule } from '@/prisma/prisma.module';
import { forwardRef, Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [PrismaModule, forwardRef(() => AnalyticsModule)],
  controllers: [LinksController],
  providers: [LinksService],
  exports: [LinksService],
})
export class LinksModule {}
