import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import { GamefilesService } from './gamefiles.service';
import type { Response } from 'express';


/**
 * Controller that serves game related files
 * Handles requests to localhost:3000/gamefiles
 * Anything after gamefiles will be searched in the 
 * specified root folder
 */
@Controller('gamefiles')
export class GamefilesController {
    constructor(private gameService: GamefilesService) {}

    // For all Requests to this Controller, serve them from root + url
    @Get('*path')
    serveGameFiles(@Res() res: Response, @Req() req: Request)
    {
        const root = "/home/sikunne/42_transcendance_learning/Preparation/BabylonJS/test4"
        this.gameService.serve(res, req.url, root);
    }
}
