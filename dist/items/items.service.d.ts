import { Neo4jService } from '@nhogs/nestjs-neo4j/dist/service';
import { Item } from './entities/item.entity';
export declare class ItemsService {
    private readonly neo4jService;
    constructor(neo4jService: Neo4jService);
    findAll(): Promise<Item[]>;
}
