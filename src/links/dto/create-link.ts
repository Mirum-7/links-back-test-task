import {
  IsDateString,
  IsOptional,
  IsUrl,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateLinkDto {
  @IsUrl(undefined)
  originalUrl: string;

  @Matches(/^[a-z0-9-_]*$/, {
    message:
      'Alias must contain only lowercase letters, dashes, and underscores',
  })
  @MaxLength(20)
  @IsOptional()
  alias: string | null;

  @IsDateString()
  @IsOptional()
  expiresAt: number | null;
}
