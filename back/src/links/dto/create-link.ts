import { IsDateString, IsString, IsUrl, MaxLength } from 'class-validator';

export class CreateLinkDto {
  @IsString()
  @IsUrl()
  originalUrl: string;

  @IsString()
  @MaxLength(20)
  alias: string;

  @IsDateString()
  expiresAt: string;
}
