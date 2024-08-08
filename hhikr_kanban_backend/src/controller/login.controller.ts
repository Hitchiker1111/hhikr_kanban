import { Controller, Post, Body, Provide } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api')
export class LoginController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(
    @Body() body: { email: string; password: string },
    ctx: Context
  ): Promise<void> {
    const { email, password } = body;
    const isValid = await this.userService.validateUser(email, password);
    if (isValid) {
      ctx.body = { success: true };
    } else {
      ctx.body = { success: false };
    }
  }
}
