import { Module } from '@nestjs/common';
import { ArtikelService } from './artikel.service';
import { ArtikelController } from './artikel.controller';

@Module({
  controllers: [ArtikelController],
  providers: [ArtikelService],
})
export class ArtikelModule {}
