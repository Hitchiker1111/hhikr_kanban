import { Controller, Post, Body, Provide, Inject } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api')
export class LoginController {
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    // 修改为 Promise<any>
    console.log('Login request received:', body);
    const { email, password } = body;
    const isValid = await this.userService.validateUser(email, password);
    console.log('Validation result:', isValid);

    if (isValid) {
      return { success: true }; // 直接返回对象
    } else {
      return { success: false, message: 'Invalid email or password' }; // 直接返回对象
    }
  }
}
