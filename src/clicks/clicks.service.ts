import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateOneClick } from './models/create-one';

@Injectable()
export class ClicksService {
  constructor(private readonly prisma: PrismaService) {}

  createOne(data: CreateOneClick) {
    return this.prisma.clicks.create({
      data: {
        linkId: data.linkId,
        ip: data.ip,
      },
    });
  }

  findLastByLinkId(linkId: bigint, take?: number) {
    return this.prisma.clicks.findMany({
      where: { linkId },
      orderBy: { createdAt: 'desc' },
      take: take,
    });
  }

  getClicksCount(linkId: bigint) {
    return this.prisma.clicks.count({
      where: { linkId },
    });
  }
}
