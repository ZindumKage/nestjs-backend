import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
export class CreateUserDto {
  @ApiProperty({ example: 'james@example.com' })
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description:
      'User password (must include uppercase, lowercase, number, and symbol)',
    example: 'P@ssw0rd!2026',
    minLength: 8,
    maxLength: 64,
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MaxLength(64, { message: 'Password must not exceed 64 characters' })
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'Password is too weak. It must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.',
    },
  )
  password: string;

  @ApiProperty({ example: 'James10' })
  @IsString()
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(4, { message: 'Username must be at least 4 characters long' })
  @MaxLength(25, { message: 'Username must not exceed 25 characters' })
  username: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
