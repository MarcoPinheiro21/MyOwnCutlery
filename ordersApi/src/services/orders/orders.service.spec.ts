import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { IOrdersRepository } from '../../repository/iOrders.repository';
import { DomainMapper } from '../mapper/domain.mapper';
import { HttpService } from '@nestjs/common';
import { CustomersService } from '../customers/customers.service';

const mockOrdersRepo = () => ({
  findAll: jest.fn(),

});

const mockHttpService = () => ({

});

const mockCustomersRepo = () => ({

});

describe('OrdersService', () => {
  let service: OrdersService;
  let repository: IOrdersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService, DomainMapper,
        { provide: 'IOrdersRepository', useFactory: mockOrdersRepo },
        { provide: HttpService, useFactory: mockHttpService },
        { provide: CustomersService, useFactory: mockCustomersRepo }]
    }).compile();

    service = module.get<OrdersService>(OrdersService);
    repository = module.get<IOrdersRepository>('IOrdersRepository');

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});
