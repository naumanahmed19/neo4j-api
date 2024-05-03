import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

describe('ItemsController', () => {
  let itemsController: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        {
          provide: ItemsService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    itemsController = module.get<ItemsController>(ItemsController);
    itemsService = module.get<ItemsService>(ItemsService);
  });

  it('should call findAll method from ItemsService', async () => {
    // Arrange
    const mockItems: Item[] = [
      {
        id: 1, name: 'Item 1',
        description: undefined,
        parent: undefined
      },
      {
        id: 2, name: 'Item 2',
        description: undefined,
        parent: undefined
      },
    ];
    itemsService.findAll = jest.fn().mockResolvedValue(mockItems);

    await itemsController.findAll();
    expect(itemsService.findAll).toHaveBeenCalled();
  });
});
