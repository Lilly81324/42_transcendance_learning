// Import Controller Class and all Methods we need
import { Controller, Get, Query, Res, Req } from '@nestjs/common';
import type { Response } from 'express';
// Import the Service that this Controller uses
import { EventsService } from './events.service';

// Mark Controller for specific url, here: localhost/test
@Controller('test')
// Create Controller Class
export class EventsController {

    // In Constructor, add the EventService Class
    constructor(private eventService: EventsService) {}

    // Method that should be handled
    // localhost:3000/test?id=123abc
    @Get()
    // Function to call -> Return Type is given to End User
    getQuery(@Query('id') id: string): string {
        // Call the Services specific function you need
        return `The query is: ${id}`;
    }

    // localhost:3000/test/hello
    @Get("hello")
    hello_world(): string {
        return (this.eventService.greet());
    }
}
