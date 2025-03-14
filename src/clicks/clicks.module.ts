import { Module } from '@nestjs/common';
import { ClicksService } from './clicks.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ClicksService],
  exports: [ClicksService],
})
export class ClicksModule {}
