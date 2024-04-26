import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Neo4jService } from '@nhogs/nestjs-neo4j/dist/service';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  
  constructor(private readonly neo4jService: Neo4jService) {}

  async findAll(): Promise<Item[]> {
      let response =  await this.neo4jService.run({
        cypher: 'MATCH (n:data) RETURN n',
      });
  
      let results: Item[] =  response.records.map((record) => record.get('n').properties);
  
    return results
  }
  

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }
}
