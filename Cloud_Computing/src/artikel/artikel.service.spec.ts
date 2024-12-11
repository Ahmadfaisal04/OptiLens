import { Test, TestingModule } from '@nestjs/testing';
import { ArtikelService } from './artikel.service';

describe('ArtikelService', () => {
  let service: ArtikelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtikelService],
    }).compile();

    service = module.get<ArtikelService>(ArtikelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
