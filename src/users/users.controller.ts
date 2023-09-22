import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
//import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { UserEntity } from './entities/user.entity';
import { UserSignInDto } from './dto/user-signin.dto';
import { CurrentUser } from 'src/utility/decorators/current-user.decorator';
import { AuthenticationGuard } from 'src/utility/quards/authentication.quard';
import { AuthorizeRoles } from 'src/utility/decorators/authorize-roles.decorator';
import { Roles } from 'src/utility/common/user-roles.enum';
import { AuthorizeGuard } from 'src/utility/quards/authorization.quard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Body() userSignUpDto: UserSignupDto): Promise<{user:UserEntity}> {
    return {user:await this.usersService.signup(userSignUpDto)};
  }

  @Post('signin')
  async signin(@Body() userSignInDto: UserSignInDto): Promise<{user:UserEntity, accessToken:string}> {
    const user = await this.usersService.signin(userSignInDto);
    const accessToken = await this.usersService.accessToken(user);
    
    return {user, accessToken}; 
  }

  // @AuthorizeRoles(UserRoles.ADMIN)
  @UseGuards(AuthenticationGuard, AuthorizeGuard([Roles.ADMIN]))
  @Get('all')
  async findAll(): Promise<UserEntity[]> {
    return await this.usersService.findAll();
  }

  @Get('single/:id')
  async findOne(@Param('id') id: string): Promise<UserEntity> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @UseGuards(AuthenticationGuard)
  @Get('me')
  getProfile(@CurrentUser() currentuser: UserEntity) {
    return currentuser
  }
}
