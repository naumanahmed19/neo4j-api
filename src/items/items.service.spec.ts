import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { Neo4jService } from '@nhogs/nestjs-neo4j/dist/service';
import { Item } from './entities/item.entity';

describe('ItemsService', () => {
  let itemsService: ItemsService;
  let neo4jService: Neo4jService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ItemsService,
        {
          provide: Neo4jService,
          useValue: {
            run: jest.fn(),
          },
        },
      ],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    neo4jService = module.get<Neo4jService>(Neo4jService);
  });

  it('should return items from Neo4j', async () => {
    // Arrange
    const mockResponse = {
      records: [
        {
          get: jest.fn().mockReturnValue({
            properties: {
              id: 1,
              name: 'Sample Item',
            },
          }),
        },
      ],
    };
    neo4jService.run = jest.fn().mockResolvedValue(mockResponse);

    const result: Item[] = await itemsService.findAll();
    
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
    expect(result[0].name).toBe('Sample Item');
  });
});