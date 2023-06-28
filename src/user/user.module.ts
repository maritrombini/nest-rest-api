import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UniqueUserNameConstraint } from './unique.validator';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, UniqueUserNameConstraint],
})
export class UserModule {}
