import { Module } from '@nestjs/common';
import { GamefilesModule } from './gamefiles/gamefiles.module';
import { GameModule } from './game/game.module';
import { HealthModule } from './health/health.module';
import { EventsGateway } from './websock/events.gateway';

@Module({
  imports: [GamefilesModule, GameModule, HealthModule],
  providers: [EventsGateway]
})
export class AppModule {}
