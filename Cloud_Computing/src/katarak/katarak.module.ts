import { Module } from '@nestjs/common';
import { KatarakService } from './katarak.service';
import { KatarakController } from './katarak.controller';

@Module({
  controllers: [KatarakController],
  providers: [KatarakService],
})
export class KatarakModule {}
