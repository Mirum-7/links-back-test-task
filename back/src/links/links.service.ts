import { PrismaService } from '@/prisma/prisma.service';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLinkDto } from './dto/create-link';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto) {
    const { alias, originalUrl, expiresAt } = createLinkDto;

    const now = new Date();
    const expiryDate = new Date(expiresAt);

    // Check if expiry date is in the future.
    if (expiryDate <= now) {
      throw new ConflictException('Expiry date must be in the future');
    }

    try {
      return await this.prisma.links.create({
        data: {
          originalUrl,
          alias,
          expiresAt: expiryDate,
        },
      });
    } catch (error) {
      const { code } = error;

      switch (code) {
        case 'P2002':
          throw new ConflictException(`Alias "${alias}" already exists`);
        default:
          throw error;
      }
    }
  }

  async getOne(alias: string) {
    try {
      return await this.prisma.links.findUniqueOrThrow({
        where: { alias },
      });
    } catch (error) {
      const { code } = error;

      console.log('code', code);

      switch (code) {
        case 'P2025':
          throw new NotFoundException(`Alias "${alias}" not found`);
        default:
          throw error;
      }
    }
  }

  delete(alias: string) {
    try {
      return this.prisma.links.delete({
        where: { alias },
      });
    } catch (error) {
      const { code } = error;

      switch (code) {
        case 'P2025':
          throw new NotFoundException(`Alias "${alias}" not found`);
        default:
          throw error;
      }
    }
  }
}
