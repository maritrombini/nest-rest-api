import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { NestResponse } from '../core/http/nest-response';
import { NestResponseBuilder } from '../core/http/nest-response-builder';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':name')
  public searchUserByName(@Param('name') name: string) {
    const user = this.userService.searchUserByName(name);

    if (!user) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'User not found!',
      });
    }
    return user;
  }

  @Post()
  public create(@Body() user: User): NestResponse {
    const createdUser = this.userService.create(user);
    return new NestResponseBuilder()
      .withStatus(HttpStatus.CREATED)
      .withHeaders({
        Location: `/users/${createdUser.userName}`,
      })
      .withBody(createdUser)
      .build();
  }
}
