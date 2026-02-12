import { Controller, Get, Post, Body, RawBodyRequest } from '@nestjs/common';
import { CatService } from './cat.service';

@Controller()
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Get()
  findAll(): string[] {
    return this.catService.getAll();
  }

  @Post()
  addCat(@Body() cat: string) {
    this.catService.addCat(cat);
  }
}
