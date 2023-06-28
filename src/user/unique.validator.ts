/* eslint-disable @typescript-eslint/ban-types */
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from './user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint()
export class UniqueUserNameConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  validate(
    userName: string,
    validationArguments?: ValidationArguments,
  ): boolean | Promise<boolean> {
    return !!!this.userService.searchUserByName(userName);
  }
}

export function UniqueUserName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: UniqueUserNameConstraint,
    });
  };
}
