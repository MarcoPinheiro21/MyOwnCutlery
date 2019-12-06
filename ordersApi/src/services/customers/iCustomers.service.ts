import { CustomerDto } from "src/dto/customer.dto";
import { EditCustomerDto } from "src/dto/customer.edit.dto";

export interface ICustomersService {

    findAll(): Promise<CustomerDto[]>;

    findById(customerId: string): Promise<CustomerDto>;

    createCustomer(customerDto: CustomerDto): Promise<CustomerDto>;

    forgetCustomerData(customerId: string): Promise<CustomerDto>;

    editCustomerData(id: string, customerDto: EditCustomerDto): Promise<CustomerDto>;

    deleteCustomer(id : string) : Promise<CustomerDto>;

}
