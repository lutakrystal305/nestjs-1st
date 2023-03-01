import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserAuthDTO } from './dto/userAuth.dto';
import { JưtPayload } from './jwt/jwt-payload.interface';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userAuthDTO: UserAuthDTO): Promise<User> {
    console.log(123);
    return this.userRepository.createUser(userAuthDTO);
  }

  async signIn(userAuthDTO: UserAuthDTO): Promise<{ accessToken: string }> {
    const { username, password } = userAuthDTO;
    const user = this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, (await user).password))) {
      const payload: JưtPayload = { username };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException(
        'Please check your username and password!',
      );
    }
  }
}
