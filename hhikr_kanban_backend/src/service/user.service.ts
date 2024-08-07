import { Provide } from '@midwayjs/core';
import { User } from '../model/user';

@Provide()
export class UserService {
  private users: User[] = [];

  constructor() {
    this.users.push(new User('hhikr', '114514'));
  }

  async validateUser(name: string, password: string): Promise<boolean> {
    const user = this.users.find(
      user => user.name === name && user.password === password
    );
    return user !== undefined;
  }
}
