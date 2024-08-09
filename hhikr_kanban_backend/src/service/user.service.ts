import { Provide } from '@midwayjs/core';
import { User } from '../model/user';

@Provide()
export class UserService {
  private users: User[] = [];

  constructor() {
    this.users.push(new User('hhikr@42.com', '114514'));
  }

  async validateUser(email: string, password: string): Promise<boolean> {
    const user = this.users.find(
      user => user.email === email && user.password === password
    );
    console.log('User found:', user);
    return user !== undefined;
  }
}
