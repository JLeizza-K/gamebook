import { Test, TestingModule } from '@nestjs/testing';
import { ScoreController } from '../../modules/score/score.controller';
import { ScoreService } from '../../modules/score/score.service';

describe('ScoreController', () => {
  let controller: ScoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ScoreController],
      providers: [ScoreService],
    }).compile();

    controller = module.get<ScoreController>(ScoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
