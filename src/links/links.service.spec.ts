import { ClicksService } from '@/clicks/clicks.service';
import { PrismaService } from '@/prisma/prisma.service';
import { ConflictException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Links, PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { CreateLinkDto } from './dto/create-link';
import { LinksService } from './links.service';

describe('LinksService', () => {
  let prisma: DeepMockProxy<PrismaService>;
  let service: LinksService;

  let mockLinkRequest: CreateLinkDto;
  let mockLinkData: Links;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [LinksService, PrismaService, ClicksService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaClient>())
      .compile();

    service = module.get(LinksService);
    prisma = module.get(PrismaService);

    const expiresAt = new Date(Date.now() + 10000);

    mockLinkRequest = {
      alias: 'google',
      originalUrl: 'https://google.com',
      expiresAt: expiresAt.getTime(),
    };

    mockLinkData = {
      id: 1n,
      alias: mockLinkRequest.alias!,
      originalUrl: mockLinkRequest.originalUrl,
      expiresAt,
      createdAt: new Date(),
    };
  });

  it('Create new alias', async () => {
    prisma.links.create.mockResolvedValueOnce(mockLinkData);

    expect(await service.create(mockLinkRequest)).toBe(mockLinkData);
  });

  it('Create exist alias', async () => {
    prisma.links.create.mockRejectedValueOnce({
      code: 'P2002',
    });

    await expect(service.create(mockLinkRequest)).rejects.toThrow(
      new ConflictException({ alias: 'Alias "google" already exists' }),
    );
  });

  it('Create alias in the past', async () => {
    const mockLinkPastRequest = {
      ...mockLinkRequest,
      expiresAt: new Date(Date.now() - 10000).getTime(),
    };

    await expect(service.create(mockLinkPastRequest)).rejects.toThrow(
      new ConflictException({
        expiresAt: 'Expiry date must be in the future',
      }),
    );
  });
});
