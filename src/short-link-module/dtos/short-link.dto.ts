import { IsNotEmpty, IsString } from 'class-validator';

export class ShortLinkDto {
  @IsNotEmpty()
  @IsString()
  url: string;
}
