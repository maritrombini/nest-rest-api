import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
  private users: Array<User> = [
    {
      id: 1,
      userName: 'Mari',
      email: 'mari@mail.com',
      secret: '123',
      fullName: 'Mariana Trombini',
      entryDate: new Date(),
    },
  ];

  public searchUserByName(name: string): User {
    return this.users.find((user) => user.userName === name);
  }

  public create(user: User): User {
    this.users.push(user);

    return user;
  }
}
