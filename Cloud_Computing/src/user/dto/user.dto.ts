import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsEnum, IsUUID } from 'class-validator';
import { Role } from '@prisma/client';  // Assuming the Role enum is defined in Prisma

export class UserDTO {
  @ApiProperty({
    description: 'Unique identifier for the user',
    example: 'fcefbdf6-6f50-4db0-979d-032951a02222',
  })
  @IsUUID()
  uuid: string;

  @ApiProperty({
    description: 'The username of the user, must be unique',
    example: 'john_doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The email address of the user, must be unique',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securePassword123!',
  })
  @IsString()
  password: string;

  @ApiProperty({
    description: 'The role of the user, either "USER" or "ADMIN"',
    example: 'USER',
    enum: Role,  // Enum values coming from the Prisma Role enum
  })
  @IsEnum(Role)
  role: Role;

  @ApiProperty({
    description: 'Timestamp when the user was created',
    example: '2024-12-03T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the user was last updated',
    example: '2024-12-03T12:34:56.789Z',
  })
  updatedAt: Date;
}
