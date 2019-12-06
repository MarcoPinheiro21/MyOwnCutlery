import { getRepository, getMongoRepository } from 'typeorm';
import { Customer } from 'src/domain/customer.domain';


export interface ICustomersRepository {

    saveCustomer(customer: Customer): Promise<Customer>;

    findAllCustomers(): Promise<Customer[]>;

    findCustomerById(id: string): Promise<Customer>;

    findCustomerByVatNumber(vatNumber: string): Promise<Customer>;

    deleteCustomer(customer: Customer): Promise<Customer>;

}
