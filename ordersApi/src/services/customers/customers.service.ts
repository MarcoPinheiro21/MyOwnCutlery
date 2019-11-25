import { Injectable } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/models/customer.entity';
import { AddressDto } from 'src/dto/address.dto';
import { Address } from 'src/models/address';
import { getRepository } from 'typeorm';

@Injectable()
export class CustomersService {

    constructor() { }

    public async findCustomer(customerId : string) : Promise<CustomerDto>{
        let customerResult = await getRepository(Customer).findOne(customerId);
        return customerResult.toDto();
    }

    public async createCustomer(customerDto : CustomerDto) : Promise<CustomerDto> {
        let customer : Customer = await this.dtoToModel(customerDto);
        let resultCustomer = await getRepository(Customer).save(customer);
        return resultCustomer.toDto();
    }

    public async dtoToModel(customerDto: CustomerDto): Promise<Customer> {
        let customer = new Customer(
            customerDto.id,
            customerDto.name,
            customerDto.vatNumber,
            this.toAddressModel(customerDto.address),
            customerDto.phoneNumber,
            customerDto.email,
            customerDto.priority
        );
        return customer;
    }

    private toAddressModel(addressDto: AddressDto) : Address{
        if (addressDto == null) return null;
        return new Address(
            addressDto.street,
            addressDto.postalCode,
            addressDto.town
        )
    }
}
