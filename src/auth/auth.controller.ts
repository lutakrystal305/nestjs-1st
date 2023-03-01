import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserAuthDTO } from './dto/userAuth.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(@Body() userAuthDTO: UserAuthDTO): Promise<{ accessToken: string }> {
    return this.authService.signIn(userAuthDTO);
  }

  @Post('/signup')
  signUp(@Body() userAuthDTO: UserAuthDTO): Promise<User> {
    return this.authService.signUp(userAuthDTO);
  }
}
