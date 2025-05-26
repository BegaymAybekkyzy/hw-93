import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDoc } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { RegisterUserDto } from './register-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UsersController {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
  ) {}

  @Post()
  registration(@Body() registrationDto: RegisterUserDto) {
    const newUser = new this.userModel({
      username: registrationDto.username,
      password: registrationDto.password,
    });

    newUser.generateToken();
    return newUser.save();
  }

  @UseGuards(AuthGuard('local'))
  @Post('/sessions')
  login(@Req() req: Request<{ user: User }>) {
    return req.user;
  }
}
