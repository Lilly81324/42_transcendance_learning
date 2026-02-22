import type { Response } from 'express';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

@Injectable()
/**
 * Service that provides serving the files needed for the game
 */
export class GamefilesService {

    // Function called by Controller
    serve(res: Response, url: string, root: string)
    {
        const filePath: string = root + url.replace("/gamefiles", "")
        
        // Serve file if it exists
        try {
            const stat = fs.statSync(filePath);
            if (stat.isFile())
                return (res.sendFile(filePath));
        }
        catch {
            console.log(`Failed to access file. Url: ${url}, Path: ${filePath}`);
            return res.status(404).send("File not found");
        }

    }
}
