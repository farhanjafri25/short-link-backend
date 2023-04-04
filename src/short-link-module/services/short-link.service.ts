import { BadRequestException, Injectable } from '@nestjs/common';
import { ShortLinkRepository } from '../repositories/short-link.repository';
import * as shortid from 'shortid';
import { ShortLinkEntity } from '../entities/short-link.entity';

@Injectable()
export class ShortLinkService {
  constructor(private shortLinkRepository: ShortLinkRepository) {}

  public async saveNewLink(body: any, userId: string): Promise<any> {
    const shortCode = shortid.generate();
    const expirationDate = new Date(Date.now() + 48 * 60 * 60 * 1000);
    const shortLink = new ShortLinkEntity();
    shortLink.userId = userId;
    shortLink.url = body.url;
    shortLink.shortCode = shortCode;
    shortLink.expirationDate = expirationDate;
    return await this.shortLinkRepository.saveUrl(shortLink);
  }

  public async getShortLink(userId: string): Promise<any> {
    try {
      const res = await this.shortLinkRepository.getLink(userId);
      console.log(`res --->`, res);
      const expirationDate = new Date(res.expirationDate);
      const diffInMs = Math.abs(
        new Date().getTime() - expirationDate.getTime(),
      );
      const diffInHours = diffInMs / (1000 * 60 * 60);
      console.log(`diffInHours`, diffInHours);
      if (diffInHours > 48) {
        await this.shortLinkRepository.setActiveLink(res.short_code);
        throw new BadRequestException('Link expired, Generate a new link');
      }
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  public async deleteLink(): Promise<any> {
    return await this.shortLinkRepository.deleteLink();
  }
  public async getAllShortLink(
    userId: string,
    skip: number,
    limit: number,
    page: number,
  ): Promise<any> {
    const data = await this.shortLinkRepository.getAllLinksGenerated(
      userId,
      skip,
      limit,
    );
    const nextPage = data.length < limit + 1 ? null : Number(page) + 1;
    const docs = data.length < limit + 1 ? data : data.slice(0, limit + 1);
    return {
      docs: docs,
      nextPage: nextPage,
    };
  }
}
