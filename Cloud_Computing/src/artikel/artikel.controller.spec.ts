import { Test, TestingModule } from '@nestjs/testing';
import { ArtikelController } from './artikel.controller';
import { ArtikelService } from './artikel.service';

describe('ArtikelController', () => {
  let controller: ArtikelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtikelController],
      providers: [ArtikelService],
    }).compile();

    controller = module.get<ArtikelController>(ArtikelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
