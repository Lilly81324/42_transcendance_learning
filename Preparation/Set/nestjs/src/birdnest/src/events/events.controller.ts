// Import Controller Class and all Methods we need
import { Controller, Get, Param, Query, Headers, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
// Import the Service that this Controller uses
import { EventsService } from './events.service';

// Mark Controller for specific url, here: localhost/target
@Controller('target')
// Create Controller Class
export class EventsController {

    // In Constructor, add the EventService Class
    constructor(private eventService: EventsService) {}

    // Method that should be handled
    @Get()
    // Function to call -> Return Type is given to End User
    findAll(@Query('id') id: string): string {
        // Call the Services specific function you need
        return `The query is: ${id}`;
    }

    // @Get("test")
    // Function to call -> Return Type is given to End User
    // findAll2(@Res() res: Response) {
    //     // Call the Services specific function you need
    //     res.status(HttpStatus.CREATED).send();
    //     return [];
    // }
}
