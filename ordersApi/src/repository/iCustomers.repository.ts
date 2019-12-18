import { Customer } from '../domain/customer.domain';


export interface ICustomersRepository {

    saveCustomer(customer: Customer): Promise<Customer>;

    findAllCustomers(): Promise<Customer[]>;

    findCustomerById(id: string): Promise<Customer>;

    findCustomerByVatNumber(vatNumber: string): Promise<Customer>;

    deleteCustomer(customer: Customer): Promise<Customer>;

}
