import { IsNotEmpty, MinLength, IsEmail } from 'class-validator';

export class UserSignInDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Email must be a valid email' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password minimun characters should be 5' })
  password: string;
}
