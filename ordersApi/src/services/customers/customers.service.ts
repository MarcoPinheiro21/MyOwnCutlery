import { Injectable, HttpException } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/models/customer.entity';
import { AddressDto } from 'src/dto/address.dto';
import { Address } from 'src/models/address';
import { getRepository } from 'typeorm';
import { ICustomersService } from './iCustomers.service';

@Injectable()
export class CustomersService implements ICustomersService{

    constructor() { }

    public async findAll(): Promise<Customer[]> {
        return await getRepository(Customer).find();
    }

    public async findById(customerId: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(customerId)
        return await customerResult.toDto();
    }

    private async findById_(customerId: string): Promise<Customer> {
        try {
            let customerResult = await getRepository(Customer).findOne(customerId)
            return customerResult;
        } catch (errors) {
            throw new HttpException('User with id does not exist.', 400);
        }

    }

    public async createCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
        let customer: Customer = await this.dtoToModel(customerDto);
        let resultCustomer = await getRepository(Customer).save(customer);
        return resultCustomer.toDto();
    }

    public async forgetCustomerData(customerId: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(customerId);
        let resultCustomer = await getRepository(Customer).save(customerResult.forgetData());
        return resultCustomer.toDto();
    }

    public async dtoToModel(customerDto: CustomerDto): Promise<Customer> {
        let customer = new Customer(
            customerDto._id,
            customerDto.name,
            customerDto.vatNumber,
            this.toAddressModel(customerDto.address),
            customerDto.phoneNumber,
            customerDto.email,
            customerDto.priority,
            customerDto.userId
        );
        return customer;
    }

    private toAddressModel(addressDto: AddressDto): Address {
        if (addressDto == null) return null;
        return new Address(
            addressDto.street,
            addressDto.postalCode,
            addressDto.town
        )
    }
}