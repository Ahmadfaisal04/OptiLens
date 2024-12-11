import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiQuery, ApiBody, ApiConsumes, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ArtikelService } from './artikel.service';
import { CreateArtikelDto } from './dto/create-artikel.dto';
import { QueryDTO } from 'src/dto/query-dto';
import { AuthGuard, Roles } from 'src/auth/auth.guard';

@ApiTags('Artikel')
@Controller('api/artikel')
@UseGuards(AuthGuard)
@ApiBearerAuth()
export class ArtikelController {
  constructor(private readonly artikelService: ArtikelService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of articles' })
  async getArtikel(@Query() query: QueryDTO) {
    return this.artikelService.getArtikel(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve details of a specific article' })
  @ApiParam({
    name: 'id',
    description: 'ID of the article',
    example: 1,
  })
  async getArtikelDetail(@Param('id', ParseIntPipe) id: number) {
    return this.artikelService.getArtikelDetail(id);
  }

  @Post()
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Create a new article' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Data for creating a new article',
    type: CreateArtikelDto,
    examples: {
      default: {
        summary: 'Example data',
        value: {
          judul: 'New Technology Trends',
          content: 'This is an article about new technology trends.',
        },
      },
    },
  })
  async createArtikel(
    @Body() data: CreateArtikelDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.artikelService.createArtikel(data, file);
  }

  @Put(':id')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Update an existing article' })
  @ApiConsumes('multipart/form-data')
  @ApiParam({
    name: 'id',
    description: 'ID of the article to update',
    example: 1,
  })
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'Data for updating the article',
    type: CreateArtikelDto,
    examples: {
      default: {
        summary: 'Example data',
        value: {
          judul: 'Updated Technology Trends',
          content: 'Updated content for the article.',
        },
      },
    },
  })
  async updateArtikel(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateArtikelDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.artikelService.updateArtikel(id, data, file);
  }

  @Delete(':id')
  @Roles("ADMIN")
  @ApiOperation({ summary: 'Delete an article' })
  @ApiParam({
    name: 'id',
    description: 'ID of the article to delete',
    example: 1,
  })
  async removeArtikel(@Param('id', ParseIntPipe) id: number) {
    return this.artikelService.removeArtikel(id);
  }

  @Get(':id/gambar')
  @ApiOperation({ summary: 'Retrieve the image of a specific article' })
  @ApiParam({
    name: 'id',
    description: 'ID of the article',
    example: 1,
  })
  async getArtikelGambar(@Param('id', ParseIntPipe) id: number) {
    return this.artikelService.getArtikelGambar(id);
  }
}
