import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  public async saveUser(body: any): Promise<any> {
    try {
      body['userId'] = uuidv4();
      const res = await this.userRepository.saveNewUser(body);
      if (res) {
        const payload = {
          id: body.userId,
          username: body.name,
          email: body.email,
        };
        const accessToken = this.jwtService.sign(payload, {
          expiresIn: '30d',
        });
        return accessToken;
      }
      return {
        code: 400,
        message: 'Error creating User',
      };
    } catch (error) {
      console.log(error);
      return;
    }
  }
  public async loginUser(email: string): Promise<any> {
    try {
      const res = await this.userRepository.getUser(email);
      console.log(`existing user`, res);
      const accessToken = this.jwtService.sign(
        {
          id: res.id,
          username: res.name,
          email: res.email,
        },
        {
          expiresIn: '30d',
        },
      );
      return accessToken;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
