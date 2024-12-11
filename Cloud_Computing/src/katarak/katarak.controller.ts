import { BadGatewayException, Controller, Get, Param, Post, Query, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { exec } from 'child_process';
import { join } from 'path';
import { KatarakService } from './katarak.service';
import { unlinkSync, writeFileSync } from 'fs';
import { PredictDto } from './dto/predict.dto';
import { ApiConsumes, ApiBody, ApiBearerAuth, ApiResponse, ApiProperty } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { UserDecorator, UserType } from 'src/auth/user.decorator';
import { QueryDTO } from 'src/dto/query-dto';
import { Response } from 'express';
import { cwd } from 'process';

@Controller('api/katarak')
@ApiBearerAuth()
export class KatarakController {
  constructor(private readonly katarakService: KatarakService) { }

  @Post('predict')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          
        },
      },
    },
  })
  async predict(@UserDecorator() user : UserType, @UploadedFile() file: Express.Multer.File) {
    return this.katarakService.predict(user.uuid, file)
  }

  @Get("history/:id/image")
  @ApiProperty({description : "Memberikan gambar dari history dari id history katarak"})
  @UseGuards(AuthGuard)
  @ApiResponse({status : 200, description : "Success"})
  @ApiResponse({status : 404, description : "Data not found"})
  async getHistoryImage(@Param("id") id : number, @Res() res : Response) {
    const result = await this.katarakService.getHistoryImage(id)

    res.sendFile(join(cwd(), "uploads", "history_katarak", result.nama_file))

  }

  

  @Get("history")
  @UseGuards(AuthGuard)
  @ApiResponse({status : 200, description : "Success", example : {
    data : [
      {
        id : 1,
        user_id : "uuid",
        nama_file : "file.jpg",
        normal : 0.2,
        mature : 0.5,
        immature : 0.5
      }
    ],
    count : 0
  }})
  async getHistory(@UserDecorator() user : UserType, @Query() query : QueryDTO) {
    return this.katarakService.getHistory(user.uuid, query)
  }
}
