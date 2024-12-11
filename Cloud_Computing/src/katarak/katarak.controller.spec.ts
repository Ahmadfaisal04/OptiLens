import { Test, TestingModule } from '@nestjs/testing';
import { KatarakController } from './katarak.controller';
import { KatarakService } from './katarak.service';

describe('KatarakController', () => {
  let controller: KatarakController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KatarakController],
      providers: [KatarakService],
    }).compile();

    controller = module.get<KatarakController>(KatarakController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
