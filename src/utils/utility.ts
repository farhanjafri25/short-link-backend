import { Injectable } from '@nestjs/common';

@Injectable()
export class Utility {
  public getPagination(page: number, pageSize: number) {
    if (!page) page = 1;
    if (!pageSize) pageSize = 10;
    page = page - 1;
    const skip = page <= 0 ? 0 : page * pageSize;
    const limit = +(Number.isNaN(pageSize) ? 10 : pageSize);
    return {
      skip,
      limit,
      page: page + 1,
    };
  }
}
