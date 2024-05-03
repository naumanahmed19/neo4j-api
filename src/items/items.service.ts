import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j/dist/service';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll(): Promise<Item[]> {
    let response = await this.neo4jService.run({
      cypher: 'MATCH (n:data) RETURN n',
    });
  
    let results: Item[] = response.records.map((record) => {
      
      const item: Item = {
        ...record.get('n').properties,
      };
      return item;
    });
    return results;
  }
}
