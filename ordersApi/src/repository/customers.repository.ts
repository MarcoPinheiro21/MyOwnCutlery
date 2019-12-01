import { Injectable } from "@nestjs/common";
import { ICustomersRepository } from "./iCustomers.repository";
import { Customer } from "src/models/customer.entity";
import { getRepository, getMongoRepository } from "typeorm";

@Injectable()
export class CustomersRepository implements ICustomersRepository {


    async saveCustomer(customer: Customer): Promise<Customer> {
        return getRepository(Customer).save(customer);
    }

    async findAllCustomers(): Promise<Customer[]> {
        return getRepository(Customer).find();
    }

    async findCustomerById(id: string): Promise<Customer> {
        return getRepository(Customer).findOne(id);
    }

    async findCustomerByVatNumber(vatNumber: string): Promise<Customer> {
        let customerRepository = getMongoRepository(Customer);
        let customer = await customerRepository.findOne({
            where: { vatNumber: { $eq: vatNumber } }
        });
        return customer;
    }

}
