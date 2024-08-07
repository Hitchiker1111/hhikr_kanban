import { Controller, Post, Body, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api')
export class LoginController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(
    @Body() body: { name: string; password: string },
    ctx: Context
  ): Promise<void> {
    const { name, password } = body;
    const isValid = await this.userService.validateUser(name, password);
    if (isValid) {
      ctx.body = { success: true };
    } else {
      ctx.body = { success: false };
    }
  }
}
