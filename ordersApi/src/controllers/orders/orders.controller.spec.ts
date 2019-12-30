import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { IOrdersService } from '../../services/orders/iOrders.service';

const mockOrderService = () => ({
  
});

describe('Orders Controller', () => {
  let controller: OrdersController;
  let service : IOrdersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: 'IOrdersService', useFactory: mockOrderService }]
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<IOrdersService>('IOrdersService')
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
