import {
  Injectable,
  Body,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserSignupDto } from './dto/user-signup.dto';
import { hash, compare } from 'bcrypt';
import { UserSignInDto } from './dto/user-signin.dto';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async signup(userSignUpDto: UserSignupDto): Promise<UserEntity> {
    const userExists = await this.findUserByEmail(userSignUpDto.email);
    if (userExists) throw new BadRequestException('Email is not available');
    userSignUpDto.password = await hash(userSignUpDto.password, 10);
    let user = this.usersRepository.create(userSignUpDto);
    user = await this.usersRepository.save(user);
    delete user.password;
    return user;
  }

  async signin(userSignInDto: UserSignInDto) {
    const userExists = await this.usersRepository
      .createQueryBuilder('users')
      .addSelect('users.password')
      .where('users.email = :email', { email: userSignInDto.email })
      .getOne();
    if (!userExists) throw new BadRequestException('Email is incorrect');
    const validPassword = await compare(
      userSignInDto.password,
      userExists.password,
    );
    // if (!validPassword) throw new BadRequestException('password is incorrect');
    // delete userExists.password;
    return userExists;
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUserByEmail(email: string) {
    return await this.usersRepository.findOne({ where: { email } });
  }

  async accessToken(user: UserEntity): Promise<string> {
    return sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE_TIME,
      },
    );
  }
}
