// Import Controller Class and all Methods we need
import { Controller, Get } from '@nestjs/common';
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
    findAll(): any[] {
        // Call the Services specific function you need
        return this.eventService.findAll();
    }
}
