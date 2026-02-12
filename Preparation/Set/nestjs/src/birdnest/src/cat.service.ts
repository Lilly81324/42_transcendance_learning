import { Injectable } from '@nestjs/common';

@Injectable()
export class CatService {
    private readonly cats: string[] = [];
    getAll(): string[] {
        return this.cats;
    }
    addCat(catName: string) {
        this.cats.push(catName);
    }
}
