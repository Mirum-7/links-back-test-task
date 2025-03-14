import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { LinksController } from './links.controller';
import { LinksService } from './links.service';

@Module({
  imports: [PrismaModule],
  controllers: [LinksController],
  providers: [LinksService],
})
export class LinksModule {}
