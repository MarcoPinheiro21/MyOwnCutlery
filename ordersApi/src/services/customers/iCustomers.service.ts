import { Customer } from "src/models/customer.entity";
import { CustomerDto } from "src/dto/customer.dto";

export interface ICustomersService {

    findAll(): Promise<Customer[]>;

    findById(customerId: string): Promise<CustomerDto>;

    createCustomer(customerDto: CustomerDto): Promise<CustomerDto>;

    forgetCustomerData(customerId: string): Promise<CustomerDto>;

    dtoToModel(customerDto: CustomerDto): Promise<Customer>;

}
