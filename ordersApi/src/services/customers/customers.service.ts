import { Injectable, Inject } from '@nestjs/common';
import { CustomerDto } from '../../dto/customer.dto';
import { ICustomersService } from './iCustomers.service';
import { OrdersApiDomainException } from '../../exceptions/domain.exception';
import { EditCustomerDto } from '../../dto/customer.edit.dto';
import { ICustomersRepository } from '../../repository/iCustomers.repository';
import { Customer } from '../../domain/customer.domain';
import { DomainMapper } from '../mapper/domain.mapper';


@Injectable()
export class CustomersService implements ICustomersService {

    constructor(
        @Inject('ICustomersRepository') private readonly customersRepository: ICustomersRepository) {
    }

    public async findAll(): Promise<CustomerDto[]> {
        let customers = await this.findAll_();
        let customersDto: CustomerDto[] = [];
        for (let element of customers) {
            customersDto.push(await DomainMapper.customerToDto(element));

        }
        return customersDto;
    }

    private async findAll_(): Promise<Customer[]> {
        return this.customersRepository.findAllCustomers();
    }

    public async findById(customerId: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(customerId);
        return await DomainMapper.customerToDto(customerResult);
    }

    async findById_(customerId: string): Promise<Customer> {
        let customerResult;
        try {
            customerResult = await this.customersRepository.findCustomerById(customerId);
            if (customerResult == null) {
                throw new OrdersApiDomainException('User with id does not exist.');
            }
        } catch (error) {
            throw new OrdersApiDomainException('User with id does not exist.')
        }

        return customerResult;

    }

    public async createCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
        let customer: Customer = await DomainMapper.customerDtoToDomain(customerDto);
        let resultCustomer: Customer;
        try {
            resultCustomer = await this.customersRepository.saveCustomer(customer);
        } catch (error) {
            if (error.code == 11000 && (<string>error.errmsg).includes(customerDto.vatNumber)) {
                throw new OrdersApiDomainException('Customer\'s VAT number is invalid');
            }
            if (error.code == 11000 && (<string>error.errmsg).includes(customerDto.email)) {
                throw new OrdersApiDomainException('Customer\'s e-mail address is already owned by another user.');
            }
            if (error.code == 11000 && (<string>error.errmsg).includes(customerDto.userId)) {
                throw new OrdersApiDomainException('Customer\'s user id is invalid');
            }
            if (error.code == 11000) {
                throw new OrdersApiDomainException('Customer\'s user id must be specified');
            }
        }
        return DomainMapper.customerToDto(resultCustomer);
    }

    public async editCustomerData(id: string, customerDto: EditCustomerDto): Promise<CustomerDto> {
        let customer: Customer = await this.findById_(id);
        if (this.validateField(customerDto.name)) {
            customer.setName(customerDto.name);
        }
        if (this.validateField(customerDto.vatNumber)) {
            customer.setVatNumber(customerDto.vatNumber);
        }
        if (this.validateField(customerDto.phoneNumber)) {
            customer.setPhoneNumber(customerDto.phoneNumber);
        }
        if (this.validateField(customerDto.email)) {
            customer.setEmail(customerDto.email);
        }
        if (this.validateField(customerDto.priority)) {
            customer.setPriority(customerDto.priority);
        }
        if (this.validateField(customerDto.userId)) {
            customer.setUserId(customerDto.userId);
        }

        await customer.setAddress(customerDto.address.street,
            customerDto.address.postalCode,
            customerDto.address.town,
            customerDto.address.country);

        let resultCustomer = await this.customersRepository.saveCustomer(customer);
        return DomainMapper.customerToDto(resultCustomer);
    }

    public async forgetCustomerData(customerId: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(customerId);
        let resultCustomer = await this.customersRepository.saveCustomer(customerResult.forgetData());
        return DomainMapper.customerToDto(resultCustomer);
    }

    public async deleteCustomer(id: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(id);
        let deletedCustomer = await this.customersRepository.deleteCustomer(customerResult);
        return await DomainMapper.customerToDto(deletedCustomer);
    }

    private validateField(field: any): boolean {
        return field != null && field.toString().trim().length != 0
    }

}