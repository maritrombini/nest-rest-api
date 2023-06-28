import { IsEmail, IsNotEmpty } from 'class-validator';
import { UniqueUserName } from './unique.validator';
import { Exclude, Expose } from 'class-transformer';

export class User {
  id: number;

  @UniqueUserName({
    message: 'User Name must be unique.',
  })
  @IsNotEmpty({
    message: 'User Name is required.',
  })
  userName: string;

  @IsEmail(
    {},
    {
      message: 'Invalid email!',
    },
  )
  email: string;

  @Expose({
    name: 'password',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'Password is required.',
  })
  secret: string;

  @IsNotEmpty({
    message: 'Full Name is required.',
  })
  fullName: string;

  entryDate: Date;
}
