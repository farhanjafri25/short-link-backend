import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AppInterceptor } from 'src/app.interceptor';
import { Public } from '../../decorators';
import { UserDto } from '../dtos/user.dto';
import { UserService } from '../services/user.service';

@UseInterceptors(AppInterceptor)
@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/signup')
  @HttpCode(201)
  public signUpUser(@Body() body: UserDto): Promise<any> {
    try {
      const validUserKeys = ['name', 'email'];
      const isValidUserObj = Object.keys(body).every((key) =>
        validUserKeys.includes(key),
      );
      if (!isValidUserObj) {
        throw new BadRequestException('Something Went Wrong');
      }
      if (body['name']) {
        if (!body['name'].match(/^[0-9a-zA-Z]+$/)) {
          throw new BadRequestException(
            'Username must not contain special characters',
          );
        }
        if (body?.name && body?.name.length < 5)
          throw new BadRequestException(
            'Please enter username greater than 5 characters',
          );
        return this.userService.saveUser(body);
      } else {
        throw new BadRequestException('Username Cannot be Empty');
      }
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Something Went Wrong');
    }
  }

  @Public()
  @Post('/login')
  @HttpCode(200)
  public async loginUser(@Body() body: UserDto): Promise<any> {
    try {
      const { email } = body;
      const data = await this.userService.loginUser(email);
      if (data) {
        return data;
      }
      return {
        code: 400,
        message: 'Please SignUp',
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Error');
    }
  }
}
