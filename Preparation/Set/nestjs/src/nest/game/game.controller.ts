// Import Controller Class and all Methods we need
import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';
// Import the Service that this Controller uses

// Mark Controller for specific url, here: localhost/test
@Controller('/game')
// Create Controller Class
export class GameController {
    @Get()
    sendGame(@Res() res: Response) {
        return (res.sendFile("/game/index.html"));
    }
}
