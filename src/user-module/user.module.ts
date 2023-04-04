import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from 'src/strategies';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repositories/user.repository';
import { UserService } from './services/user.service';

@Module({
  imports: [JwtModule.register({ secret: `${process.env.JWT_SECRET}` })],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [
    UserService,
    UserRepository,
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
})
export class UserModule {}
