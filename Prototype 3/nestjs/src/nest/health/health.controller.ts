import { Controller, Get, Res } from '@nestjs/common';
import type { Response } from 'express';

// Health check
@Controller('/health')
export class HealthController {
    @Get()
    reportHealth() {
        return ("status: up");
    }
}
