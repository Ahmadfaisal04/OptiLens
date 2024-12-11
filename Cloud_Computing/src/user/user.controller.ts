import { Controller, Get, Param, Delete, Query, Put, Body, UploadedFile, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import { QueryDTO } from 'src/dto/query-dto';
import { EditUserDTO } from './dto/edit-user.dto';
import { UserDTO } from './dto/user.dto';
import { AuthGuard, Roles } from 'src/auth/auth.guard';
import { UserDecorator, UserType } from 'src/auth/user.decorator';

@ApiTags('user')
@Controller('api/user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Search users' })
  @ApiResponse({ status: 200, description: 'List of users', type: [UserDTO] })
  async searchUser(@Query() query: QueryDTO) {
    return this.userService.searchUser(query);
  }

  @Get(':id')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Get user details' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'fcefbdf6-6f50-4db0-979d-032951a02222' })
  @ApiResponse({ status: 200, description: 'User details', type: UserDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  async getUserDetail(@Param('id') id: string) {
    return this.userService.getUserDetail(id);
  }

  @Delete(':id')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Delete user' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'fcefbdf6-6f50-4db0-979d-032951a02222' })
  @ApiResponse({ status: 200, description: 'User deleted', type: UserDTO })
  @ApiResponse({ status: 404, description: 'User not found' })
  async deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @Put('edit-profile/:id')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Edit user profile for admin' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'fcefbdf6-6f50-4db0-979d-032951a02222' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: EditUserDTO })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @UseInterceptors(FileInterceptor('foto_profile'))
  async editProfileAdmin(
    @Param('id') id: string,
    @Body() profile: EditUserDTO,
    @UploadedFile() foto_profile: Express.Multer.File,
  ) {
    return this.userService.editProfile(id, profile, foto_profile);
  }

  
  @Put('edit-profile')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Edit user profile' })
  @ApiParam({ name: 'id', description: 'User ID', example: 'fcefbdf6-6f50-4db0-979d-032951a02222' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: EditUserDTO })
  @ApiResponse({ status: 200, description: 'Profile updated successfully' })
  @UseInterceptors(FileInterceptor('foto_profile'))
  async editProfile(
    @UserDecorator() user : UserType,
    @Body() profile: EditUserDTO,
    @UploadedFile() foto_profile: Express.Multer.File,
  ) {
    return this.userService.editProfile(user.uuid, profile, foto_profile);
  }


}
