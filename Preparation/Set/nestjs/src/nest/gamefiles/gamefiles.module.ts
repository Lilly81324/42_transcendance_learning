import { Module } from '@nestjs/common';
import { GamefilesService } from './gamefiles.service';
import { GamefilesController } from './gamefiles.controller';

@Module({
  providers: [GamefilesService],
  controllers: [GamefilesController]
})
export class GamefilesModule {}
