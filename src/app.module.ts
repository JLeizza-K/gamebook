import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ScoreModule } from './score/score.module';
import { FavouriteModule } from './favourite/favourite.module';
import { GameModule } from './game/game.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, GameModule, FavouriteModule, ScoreModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
