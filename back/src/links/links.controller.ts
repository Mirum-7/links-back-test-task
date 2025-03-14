import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateLinkDto } from './dto/create-link';
import { LinksService } from './links.service';

@Controller('/')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('shorten')
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linksService.create(createLinkDto);
  }

  @Get(':shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res: Response) {
    const link = await this.linksService.getOne(shortUrl);

    return res.redirect(link.originalUrl);
  }

  @Get('info/:shortUrl')
  info(@Param('shortUrl') shortUrl: string) {
    return this.linksService.getOne(shortUrl);
  }

  @Delete('delete/:shortUrl')
  delete(@Param('shortUrl') shortUrl: string) {
    return this.linksService.delete(shortUrl);
  }
}
