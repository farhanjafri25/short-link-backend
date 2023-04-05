import { Injectable } from '@nestjs/common';
import { Connection, LessThanOrEqual, Repository } from 'typeorm';
import { ShortLinkEntity } from '../entities/short-link.entity';

@Injectable()
export class ShortLinkRepository {
  private shortLinkRepository: Repository<ShortLinkEntity>;
  constructor(private db: Connection) {
    this.shortLinkRepository = this.db.getRepository(ShortLinkEntity);
  }
  public async saveUrl(body: any): Promise<any> {
    console.log(body);
    return this.shortLinkRepository.save(body);
  }

  public async getLink(userId: string): Promise<any> {
    try {
      console.log(`userId`, userId);
      const query = `Select * from short_links where user_id = '${userId}' and is_deleted = false order by created_at desc limit 1`;
      const data = await this.db.query(query);
      console.log(`Result from DB`, data);
      return data[0];
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  public async deleteLink(): Promise<any> {
    return this.shortLinkRepository.update(
      {
        expirationDate: LessThanOrEqual(new Date().getTime()),
      },
      { isActive: false },
    );
  }

  public async getAllLinksGenerated(
    userId: string,
    page: number,
    pageSize: number,
  ): Promise<any> {
    console.log(`take`, pageSize, `skip`, page);
    return this.shortLinkRepository.find({
      where: {
        userId: userId,
        isDeleted: false,
      },
      take: pageSize,
      skip: page,
      order: { createdAt: -1 },
    });
  }
  public async setActiveLink(code: string): Promise<any> {
    try {
      return this.shortLinkRepository.update(
        {
          shortCode: code,
        },
        { isActive: false },
      );
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
