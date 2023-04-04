import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { UserEntity } from '../entites/user.entity';

@Injectable()
export class UserRepository {
  private userRepository: Repository<UserEntity>;
  constructor(private db: Connection) {
    this.userRepository = this.db.getRepository(UserEntity);
  }
  public async saveNewUser(body: any): Promise<UserEntity> {
    try {
      const userObj = new UserEntity();
      userObj.email = body.email;
      userObj.name = body.name;
      userObj.userId = body.userId;
      console.log(`body to be saved`, userObj);
      return await this.userRepository.save(userObj);
    } catch (error) {
      console.log(error);
      return;
    }
  }
  public async getUser(email: string): Promise<UserEntity> {
    try {
      const res = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      return res;
    } catch (error) {
      console.log(error);
      return;
    }
  }
}
