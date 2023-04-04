import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class ShortLinkDto {
  @IsUrl()
  @IsNotEmpty()
  @IsString()
  url: string;
}
