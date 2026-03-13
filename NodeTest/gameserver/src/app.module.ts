import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { LobbyManager } from './LobbyManager'

/**
 * This is 1 Module, which holds Controllers, that react to Html Requests to the application,
 * and allow us to server them by running code
 * Then there are Providers, which literally just serve as classes to provide code
 */
@Module({
  imports: [],
  controllers: [AppController],
  providers: [LobbyManager],
})
export class AppModule {}
