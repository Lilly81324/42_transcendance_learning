import { Injectable } from '@nestjs/common';

// ???
@Injectable()
// Create Service Class
export class EventsService {

    // Declare functions that we will call in the Controller
    findAll(): any[] {
        return [{id: 1, name: "Angular.De Schulung", }, ];
    }
}
