import {
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsUrl()
  originalUrl: string;

  @IsString()
  @MaxLength(20)
  @IsOptional()
  alias: string | null;

  @IsNumber({
    allowInfinity: false,
    allowNaN: false,
  })
  @IsOptional()
  expiresAt: number | null;
}
