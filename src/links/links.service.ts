import { ClicksService } from '@/clicks/clicks.service';
import { PrismaService } from '@/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createHash } from 'crypto';
import { CreateLinkDto } from './dto/create-link';
import { LinkInfo } from './model/link.info';

@Injectable()
export class LinksService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clicksService: ClicksService,
  ) {}

  private generateHash(target: string, length: number = 8) {
    const timestamp = new Date().getTime().toString();
    const randomString = Math.random().toString();
    const hash = createHash('sha256')
      .update(target + timestamp + randomString)
      .digest('hex');

    return hash.slice(0, length);
  }

  async create(createLinkDto: CreateLinkDto) {
    const { alias, originalUrl, expiresAt } = createLinkDto;

    const expiryDate = expiresAt ? new Date(expiresAt) : undefined;

    // Check if expiry date is in the future.
    if (expiryDate !== undefined) {
      const now = new Date();

      if (expiryDate <= now) {
        throw new ConflictException({
          expiresAt: 'Expiry date must be in the future',
        });
      }
    }

    // Generate a hash if alias is not provided.
    const aliasOrHash = alias?.trim() || this.generateHash(originalUrl);

    try {
      return await this.prisma.links.create({
        data: {
          originalUrl,
          alias: aliasOrHash,
          expiresAt: expiryDate,
        },
      });
    } catch (error) {
      const { code } = error;

      switch (code) {
        case 'P2002':
          throw new ConflictException({
            alias: `Alias "${alias}" already exists`,
          });
        default:
          throw error;
      }
    }
  }

  async getByAlias(alias: string) {
    try {
      return await this.prisma.links.findUniqueOrThrow({
        where: { alias },
      });
    } catch (error) {
      const { code } = error;

      switch (code) {
        case 'P2025':
          throw new NotFoundException({
            alias: `Alias "${alias}" not found`,
          });
        default:
          throw error;
      }
    }
  }

  async getInfoByAlias(alias: string): Promise<LinkInfo> {
    const link = await this.getByAlias(alias);

    const clickCount = await this.clicksService.getClicksCount(link.id);

    return {
      originalUrl: link.originalUrl,
      createdAt: link.createdAt,
      clickCount,
    };
  }

  async deleteOne(alias: string) {
    try {
      await this.prisma.$transaction([
        this.clicksService.deleteByAliasDangerous(alias),
        this.prisma.links.delete({
          where: { alias },
        }),
      ]);
    } catch (error) {
      const { code } = error;

      switch (code) {
        case 'P2025':
          throw new NotFoundException({
            alias: `Alias "${alias}" not found`,
          });
        default:
          throw error;
      }
    }
  }

  async deleteExpiredLinks() {
    const now = new Date();

    await this.prisma.clicks.deleteMany({
      where: {
        Links: {
          expiresAt: {
            lt: now,
          },
        },
      },
    });

    await this.prisma.links.deleteMany({
      where: {
        expiresAt: {
          lt: now,
        },
      },
    });
  }
}
