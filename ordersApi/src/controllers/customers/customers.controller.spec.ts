import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
import { ICustomersService } from '../../services/customers/iCustomers.service';
import { CustomerDto } from '../../dto/customer.dto';
import { AddressDto } from '../../dto/address.dto';

const addressDtoMock: AddressDto = { country: 'PT', postalCode: '4000', street: 'testStreet', town: 'testTown' };
const customerDtoMock: CustomerDto = {
  _id: 'id', name: 'testName', vatNumber: '999999999',
  address: addressDtoMock, email: 'email@email.com', phoneNumber: '999999999',
  priority: 1, userId: 'testUserId'
};
const customerDtoMockArray = [customerDtoMock, customerDtoMock];

 const mockCustomersService = () => ({
  findById: jest.fn()
    .mockResolvedValueOnce(customerDtoMock),
  findAll: jest.fn()
    .mockResolvedValue(customerDtoMockArray),
  createCustomer: jest.fn(),
  forgetCustomerData: jest.fn(),
  editCustomerData: jest.fn(),
  deleteCustomer: jest.fn(),
});

describe('Customers Controller', () => {
  let controller: CustomersController;
  let service: ICustomersService;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
      providers: [{ provide: 'ICustomersService', useFactory: mockCustomersService }]
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
    service = module.get<ICustomersService>('ICustomersService');

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findById', () => {

    it('should call customer service findById and retrieve the customer', async () => {
      expect(service.findById).not.toHaveBeenCalled();
      let result = await controller.findById('id');
      expect(service.findById).toHaveBeenCalled();
      expect(result).toBe(customerDtoMock);
    });

    it('should throw error when not found', async () => {
      expect(service.findById('null')).rejects.toThrowError();
      await controller.findById('null');
    });
  })

  describe('findAll', () => {
    it('should call customer service findAll and retrieve all customers', async () => {
      expect(service.findAll).not.toHaveBeenCalled();
      let result = await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toBe(customerDtoMockArray);
    });
  });

  describe('createCustomer', () => {
    it('should call customer service createCustomer ', async () => {
      expect(service.createCustomer).not.toHaveBeenCalled();
      await controller.createCustomer(customerDtoMock);
      expect(service.createCustomer).toHaveBeenCalled();
    });
  });

  describe('forgetCustomer', () => {
    it('should call customer service forgetCustomerData ', async () => {
      expect(service.forgetCustomerData).not.toHaveBeenCalled();
      await controller.forgetCustomer('id');
      expect(service.forgetCustomerData).toHaveBeenCalled();
    });
  });

  describe('changeCustomer', () => {
    it('should call customer service editCustomerData', async () => {
      expect(service.editCustomerData).not.toHaveBeenCalled();
      await controller.changeCustomer('id', customerDtoMock);
      expect(service.editCustomerData).toHaveBeenCalled();
    });
  });

  describe('deleteCustomer', () => {
    it('should call customer service deleteCustomer', async () => {
      expect(service.deleteCustomer).not.toHaveBeenCalled();
      await controller.deleteCustomer('id');
      expect(service.deleteCustomer).toHaveBeenCalled();
    });
  });

});
