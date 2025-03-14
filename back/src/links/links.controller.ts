import { AnalyticsService } from '@/analytics/analytics.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLinkDto } from './dto/create-link';
import { LinksService } from './links.service';

@Controller('/')
export class LinksController {
  constructor(
    private readonly linksService: LinksService,
    private readonly analyticsService: AnalyticsService,
  ) {}

  @Post('shorten')
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get(':shortUrl')
  async redirect(
    @Param('shortUrl') shortUrl: string,
    @Res() res: Response,
    @Req() req: Request,
  ) {
    const link = await this.linksService.getByAlias(shortUrl);

    this.analyticsService.writeClickAnalytics(link.id, req.ip);

    return res.redirect(link.originalUrl);
  }

  @Get('info/:shortUrl')
  info(@Param('shortUrl') shortUrl: string) {
    return this.linksService.getByAlias(shortUrl);
  }

  @Delete('delete/:shortUrl')
  deleteOne(@Param('shortUrl') shortUrl: string) {
    return this.linksService.deleteOne(shortUrl);
  }
}
