import { Controller, Post, Body, Put, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/user-login.dto';
import { RegisterDTO } from './dto/register.dto';
import { ApiTags, ApiResponse, ApiBody, ApiOperation, getSchemaPath } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { UserDecorator, UserType } from './user.decorator';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { UserDTO } from 'src/user/dto/user.dto';

@ApiTags('Auth')
@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiBody({ type: LoginDTO })
  @ApiResponse({ status: 200, description: 'Login successful', schema : {
    type :"object",
    properties : {
      access_token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',  // Example JWT token
      },
      user : {
        $ref : getSchemaPath(UserDTO)
      }
    }
  } })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiBody({ schema: { type: 'object', properties: { refresh_token: { type: 'string' } } } })
  @ApiResponse({ status: 200, description: 'Token refreshed', schema: { type: 'object', properties: { access_token: { type: 'string' } } } })
  @ApiResponse({ status: 401, description: 'Invalid refresh token' })
  async refreshToken(@Body('refresh_token') refreshToken: string) {
    return await this.authService.refreshToken(refreshToken);
  }

  @Post('register')
  @ApiBody({ type: RegisterDTO })
  @ApiResponse({ status: 201, description: 'Registration successful', schema : {
    type :"object",
    properties : {
      access_token: {
        type: 'string',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',  // Example JWT token
      },
      user : {
        $ref : getSchemaPath(UserDTO)
      }
    }
  } })
  async register(@Body() registerDto: RegisterDTO) {
    return await this.authService.register(registerDto);
  }

  @Get("")
  @ApiOperation({description : "Get User Log Data"})
  @ApiResponse({status : 200, description : "User Data", type : UserDTO})
  async auth(@UserDecorator() user : UserType) {
    return user;
  }

  @Put('reset-password')
  @ApiBody({ type: ResetPasswordDTO })
  async resetPassword(@UserDecorator() user : UserType, @Body() data : ResetPasswordDTO) {
    return await this.authService.resetPassword(user.uuid, data);

  }

}
