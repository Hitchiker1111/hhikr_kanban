import { Controller, Post, Body, Provide, Inject } from '@midwayjs/core';
import { UserService } from '../service/user.service';

@Provide()
@Controller('/api')
export class LoginController {
  @Inject()
  userService: UserService;

  @Post('/login')
  async login(@Body() body: { email: string; password: string }): Promise<any> {
    console.log('Login request received:', body);
    const { email, password } = body;
    const isValid = await this.userService.validateUser(email, password);
    console.log('Validation result:', isValid);

    if (isValid) {
      return { success: true };
    } else {
      return { success: false, message: '邮箱或密码错误。请重试喵。' }; // 直接返回对象
    }
  }
}
