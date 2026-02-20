import { Module } from '@nestjs/common';
import { GameController } from './game.controller';

@Module({
  providers: [],
  controllers: [GameController]
})
export class GameModule {}
