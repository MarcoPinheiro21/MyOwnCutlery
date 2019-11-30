import { Injectable, HttpException } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { Customer } from 'src/models/customer.entity';
import { AddressDto } from 'src/dto/address.dto';
import { Address } from 'src/models/address';
import { getRepository } from 'typeorm';
import { ICustomersService } from './iCustomers.service';
import { OrdersApiDomainException } from 'src/exceptions/domain.exception';
import { EditCustomerDto } from 'src/dto/customer.edit.dto';

@Injectable()
export class CustomersService implements ICustomersService {

    constructor() { }

    public async findAll(): Promise<Customer[]> {
        return await getRepository(Customer).find();
    }

    public async findById(customerId: string): Promise<CustomerDto> {
        let customerResult = await this.findById_(customerId)
        return await customerResult.toDto();
    }

    private async findById_(customerId: string): Promise<Customer> {
        let customerResult = await getRepository(Customer).findOne(customerId)
        if (customerResult == undefined) {
            throw new OrdersApiDomainException('User with id does not exist.');
        }
        return customerResult;

    }

    public async createCustomer(customerDto: CustomerDto): Promise<CustomerDto> {
        let customer: Customer = await this.dtoToModel(customerDto);
        let resultCustomer = await getRepository(Customer).save(customer);
        return resultCustomer.toDto();
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

        await customer.setAddress(customerDto.address.street,
            customerDto.address.postalCode,
            customerDto.address.town,
            customerDto.address.country);

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
            addressDto.town,
            addressDto.country
        )
    }

    private validateField(field: any): boolean {
        return field != null && field.toString().trim().length != 0
    }
}