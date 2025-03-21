import { CurrentUserType } from './interface/current-user.interface';
import { Controller, Get, Post, Body, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { LoginUserDto } from '@user/dto/login-user.dto';
import { CreateUserDto } from '@user/dto/create-user.dto';
import { UpdateUserDto } from '@user/dto/update.user.dto';
import { LoginUser } from './interface/login-user.interface';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from '@user/schema/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("signup")
  create(@Body() createUserDto: CreateUserDto): Promise<{ success: boolean, message: string, token: string }> {
    return this.userService.create(createUserDto);
  }

  @Post("login")
  login(@Body() loginUserDto: LoginUserDto): Promise<LoginUser> {
    return this.userService.login(loginUserDto)
  }

  @Get("profile")
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() user: CurrentUserType) {
    return this.userService.findOne(user);
  }

  @Post("update")
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUserDto: UpdateUserDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: User }> {
    return this.userService.update(updateUserDto, user);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  remove(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string }> {
    return this.userService.remove(user);
  }
}