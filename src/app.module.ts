import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { postGresConfig } from './database/typeorm.config';
import { AccessTokenGuard } from './guards';
import { ShortLinkModule } from './short-link-module/short-link.module';
import { UserModule } from './user-module/user.module';

@Module({
  imports: [ShortLinkModule, TypeOrmModule.forRoot(postGresConfig), UserModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AppService,
  ],
})
export class AppModule {}
