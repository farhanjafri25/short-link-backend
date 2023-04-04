import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Utility } from 'src/utils/utility';
import { ShortLinkController } from './controller/short-link.controller';
import { ShortLinkRepository } from './repositories/short-link.repository';
import { ShortLinkService } from './services/short-link.service';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';

@Module({
  imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
  controllers: [ShortLinkController],
  providers: [
    ShortLinkService,
    ShortLinkRepository,
    Utility,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    ShortLinkService,
    ShortLinkRepository,
    Utility,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class ShortLinkModule {}
