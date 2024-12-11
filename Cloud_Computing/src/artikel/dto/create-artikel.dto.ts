import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, MaxLength, IsDate, IsInstance } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateArtikelDto {
  @ApiProperty({
    description: 'The title of the article',
    maxLength: 20,
    example: 'Penyakit Katarak',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  judul: string;

  @ApiProperty({
    description: 'The content of the article',
    example: 'Penyakit katarak adalah...',
  })
  @IsString()
  @IsNotEmpty()
  isi: string;

  @ApiPropertyOptional({
    description: 'The image file associated with the article',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  gambar?: string;

  
}
