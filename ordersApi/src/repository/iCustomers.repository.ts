import { getRepository, getMongoRepository } from 'typeorm';
import { Customer } from 'src/models/customer.entity';

export interface ICustomersRepository {

    saveCustomer(customer: Customer): Promise<Customer>;

    findAllCustomers() : Promise<Customer[]>;

    findCustomerById(id : string) : Promise<Customer>;

}
