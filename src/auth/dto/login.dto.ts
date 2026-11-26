import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'John35@example.com',
    description: 'Username or email',
  })
  @IsString()
  @IsNotEmpty({ message: 'email or username is required' })
  identifier: string;

  @ApiProperty({ example: 'P@ssw0rd!2026', description: 'User password' })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
