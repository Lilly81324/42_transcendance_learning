import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { GamefilesModule } from './gamefiles/gamefiles.module';
import { GameModule } from './game/game.module';
import { HealthModule } from './health/health.module';
import { EventsGateway } from './websock/events.gateway';

@Module({
  imports: [EventsModule, GamefilesModule, GameModule, HealthModule],
  providers: [EventsGateway]
})
export class AppModule {}
