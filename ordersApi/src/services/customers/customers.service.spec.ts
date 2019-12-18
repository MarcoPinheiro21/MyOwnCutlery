import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { ICustomersRepository } from '../../repository/iCustomers.repository';
import { CustomerDto } from '../../dto/customer.dto';
import { AddressDto } from '../../dto/address.dto';
import { Customer } from '../../domain/customer.domain';
import { Address } from '../../domain/address.domain';
import { DomainMapper } from '../mapper/domain.mapper';
import { EditCustomerDto } from 'src/dto/customer.edit.dto';

const addressDtoMock: AddressDto = { country: 'PT', postalCode: '4000', street: 'testStreet', town: 'testTown' };
const customerDtoMock: CustomerDto = {
  _id: 'id1', name: 'testName1', vatNumber: '999999999',
  address: addressDtoMock, email: 'email@email.com', phoneNumber: '901000000',
  priority: 1, userId: 'testUserId1'
};
const customerDtoMockArray = [customerDtoMock, customerDtoMock];

const addressDomainMock = new Address('testStreet', '1000-000', 'testTown', 'PT');
const customerDomainMock1 = new Customer(
  'id1', 'testName1', '999999999', addressDomainMock,
  '901000000', 'email@email.com', 1, 'testUserId1'
);
const customerDomainMock2 = new Customer(
  'id2', 'testName2', '909999999', addressDomainMock,
  '901999999', 'emailAddress@email.com', 1, 'testUserId2'
);
const customerDomainMock3 = new Customer(
  'id3', 'testName3', '909999999', addressDomainMock,
  '901999999', 'emailAddress2@email.com', 1, 'testUserId2'
);

const editCustomerDtoMock3: EditCustomerDto = {
  _id: 'id3', name: 'none', vatNumber: '777777777',
  address: addressDtoMock, email: 'none@email.com', phoneNumber: '000000000',
  priority: 5, userId: 'none'
};

const customerDomainMockArray: Customer[] = [customerDomainMock1, customerDomainMock2];
const nullCustomer: Customer = null;

const mockCustomersRepo = () => ({
  saveCustomer: jest.fn()
    .mockResolvedValueOnce(customerDomainMock1) //createCustomer
    .mockRejectedValueOnce({ code: 11000, errmsg: customerDtoMock.vatNumber }) //createCustomer
    .mockRejectedValueOnce({ code: 11000, errmsg: customerDtoMock.email }) //createCustomer
    .mockRejectedValueOnce({ code: 11000, errmsg: customerDtoMock.userId }) //createCustomer
    .mockRejectedValueOnce({ code: 11000 }) //createCustomer
    .mockResolvedValueOnce(customerDomainMock3), //editCustomerData

  findAllCustomers: jest.fn()
    .mockResolvedValueOnce(customerDomainMockArray)
    .mockRejectedValueOnce(Promise.resolve(nullCustomer)),

  findCustomerById: jest.fn()
    .mockResolvedValueOnce(customerDomainMock1)
    .mockResolvedValueOnce(customerDomainMock3)
    .mockResolvedValueOnce(customerDomainMock1), //forgetCustomerData

  findCustomerByVatNumber: jest.fn(),
  deleteCustomer: jest.fn(),
});

describe('CustomersService', () => {
  let service: CustomersService;
  let repository: ICustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService, DomainMapper,
        { provide: 'ICustomersRepository', useFactory: mockCustomersRepo }]
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repository = module.get<ICustomersRepository>('ICustomersRepository');

  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {

    it('should call customersRepository findAllCustomers and retrieve all customers', async () => {
      expect(repository.findAllCustomers).not.toHaveBeenCalled();
      let result = await service.findAll();
      expect(repository.findAllCustomers).toHaveBeenCalled();
      expect(result).toHaveLength(2);
      expect(result[0]._id).toMatch('id1');
      expect(result[1]._id).toMatch('id2');
    });
  });

  describe('findById', () => {

    it('should call customersRepository findCustomerById and retrieve a customer', async () => {
      expect(repository.findCustomerById).not.toHaveBeenCalled();
      let result = await service.findById('id1');
      expect(repository.findCustomerById).toHaveBeenCalled();
      expect(result._id).toMatch('id1');
    });

    it('should throw exception when customer id does not exists', async () => {
      expect(repository.findCustomerById).not.toHaveBeenCalled();
      expect(repository.findCustomerById('id10')).rejects.toThrowError(new Error('User with id does not exist.'));
      expect(repository.findCustomerById).toHaveBeenCalled();
    });

  })

  describe('createCustomer', () => {

    it('should call customersRepository saveCustomer and retrieve the saved customer', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      let result = await service.createCustomer(customerDtoMock);
      expect(repository.saveCustomer).toHaveBeenCalled();
      expect(result._id).toMatch('id1');
    });

    it('should throw exception when customer VAT number is invalid', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      expect(service.createCustomer(customerDtoMock)).rejects.toThrowError('Customer\'s VAT number is invalid');
    });

    it('should throw exception when customer address is already owned by another user', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      expect(service.createCustomer(customerDtoMock)).rejects.toThrowError('Customer\'s e-mail address is already owned by another user.');
    });

    it('should throw exception when customer user id is invalid', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      expect(service.createCustomer(customerDtoMock)).rejects.toThrowError('Customer\'s e-mail address is already owned by another user.');
    });

    it('should throw exception when customer user id is not specified', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      expect(service.createCustomer(customerDtoMock)).rejects.toThrowError('Customer\'s e-mail address is already owned by another user.');
    });

  })

  describe('editCustomerData', () => {

    it('should call saveCustomer after validate a valid customer data', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      let result = await service.editCustomerData('id1',editCustomerDtoMock3);
      expect(repository.saveCustomer).toHaveBeenCalled();
      expect(result.email).toBe(editCustomerDtoMock3.email);
      expect(result.address).toStrictEqual(editCustomerDtoMock3.address);
      expect(result.name).toBe(editCustomerDtoMock3.name);
      expect(result.phoneNumber).toBe(editCustomerDtoMock3.phoneNumber);
      expect(result.priority).toBe(editCustomerDtoMock3.priority);
      expect(result.userId).toBe(editCustomerDtoMock3.userId);
      expect(result.vatNumber).toBe(editCustomerDtoMock3.vatNumber);
    });

  })

  describe('forgetCustomerData', () => {

    it('should erase customer data end return customer object', async () => {
      expect(repository.saveCustomer).not.toHaveBeenCalled();
      let result = await service.forgetCustomerData("id1");
      expect(repository.saveCustomer).toHaveBeenCalled();
      expect(result.name).toBe('XXXXXXXX');
      expect(result.vatNumber).toBe('XXXXXXXXX');
      expect(result.address).toStrictEqual({street:'XXXXXXXX', postalCode:'XXXX-XXX', town:'XXXXXXXXXX',country:'XXXXXXXXXXXX'});
      expect(result.phoneNumber).toBe('XXXXXXXXX');
      expect(result.email).toBe('XXXX@XXXX.XXX');
    });
  })

});