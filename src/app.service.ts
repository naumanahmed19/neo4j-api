import { Injectable } from '@nestjs/common';
import { Neo4jService } from '@nhogs/nestjs-neo4j';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
