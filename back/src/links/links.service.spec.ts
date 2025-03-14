import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Links, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { LinksService } from './links.service';

describe('LinksService', () => {
  let prisma: DeepMockProxy<PrismaService>;
  let service: LinksService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LinksService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(LinksService);
    prisma = module.get(PrismaService);
  });

  it('Create new alias', async () => {
    const expiresAt = new Date(Date.now() + 10000);

    const mockLinkRequest = {
      alias: 'google',
      originalUrl: 'https://google.com',
      expiresAt: expiresAt.toISOString(),
    };

    const mockLinkData: Links = {
      id: 1n,
      ...mockLinkRequest,
      expiresAt,
    };

    prisma.links.create.mockResolvedValueOnce(mockLinkData);

    expect(await service.create(mockLinkRequest)).toBe(mockLinkData);
  });

  it('Create exist alias', async () => {
    const expiresAt = new Date(Date.now() + 10000);

    const mockLinkRequest = {
      alias: 'google',
      originalUrl: 'https://google.com',
      expiresAt: expiresAt.toISOString(),
    };

    prisma.links.create.mockRejectedValueOnce({
      code: 'P2002',
    });

    await expect(service.create(mockLinkRequest)).rejects.toThrow(ConflictException);
  });
});
