import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { GetCurrentUser } from 'src/decorators/currentUser.decorator';
import { Utility } from 'src/utils/utility';
import { ShortLinkDto } from '../dtos/short-link.dto';
import { ShortLinkService } from '../services/short-link.service';

@UseInterceptors(AppInterceptor)
@Controller('/link')
export class ShortLinkController {
  constructor(
    private readonly shortLinkService: ShortLinkService,
    private readonly utility: Utility,
  ) {}

  @Post('/add-link')
  @HttpCode(201)
  public createLink(
    @Body() body: ShortLinkDto,
    @GetCurrentUser('id') userId: string,
  ): Promise<any> {
    if (body.url.length > 5) {
      return this.shortLinkService.saveNewLink(body, userId);
    } else {
      throw new BadRequestException('Enter a valid Link');
    }
  }

  @Get('/user/link')
  @HttpCode(200)
  public async getLink(@GetCurrentUser('id') userId: string): Promise<any> {
    const res = await this.shortLinkService.getShortLink(userId);
    if (res) {
      return res;
    }
    return { message: 'No links Generated yet' };
  }

  @Get('/analytics')
  @HttpCode(200)
  public getAnalytics(
    @GetCurrentUser('id') userId: string,
    @Query() queryParam: any,
  ): Promise<any> {
    const { skip, limit, page } = this.utility.getPagination(
      queryParam.page,
      queryParam.pageSize,
    );
    return this.shortLinkService.getAllShortLink(userId, skip, limit, page);
  }
}
