import { Injectable } from "@nestjs/common";
import { ICustomersRepository } from "./iCustomers.repository";
import { getRepository, getMongoRepository } from "typeorm";
import { Customer } from "src/domain/customer.domain";
import { CustomerModel } from "src/models/customer.entity";
import { ModelMapper } from "./model.mapper";

@Injectable()
export class CustomersRepository implements ICustomersRepository {

    async saveCustomer(customer: Customer): Promise<Customer> {
        let customerModel = await ModelMapper.createCustomerModel(customer);
        let result = await getRepository(CustomerModel).save(customerModel);
        return await ModelMapper.createCustomerDomain(result);
    }

    async findAllCustomers(): Promise<Customer[]> {
        let customersModel = await getRepository(CustomerModel).find();
        let customers: Customer[] = [];
        for (let c of customersModel) {
            customers.push(await ModelMapper.createCustomerDomain(c));
        }
        return customers;
    }

    async findCustomerById(id: string): Promise<Customer> {
        let customerModel = await getRepository(CustomerModel).findOne(id);
        return await ModelMapper.createCustomerDomain(customerModel);
    }

    async findCustomerByVatNumber(vatNumber: string): Promise<Customer> {
        let customerRepository = getMongoRepository(CustomerModel);
        let customerModel = await customerRepository.findOne({
            where: { vatNumber: { $eq: vatNumber } }
        });
        return await ModelMapper.createCustomerDomain(customerModel);
    }

    async deleteCustomer(customer: Customer): Promise<Customer>{
        let customerModel = await ModelMapper.createCustomerModel(customer);
        let result = await getRepository(CustomerModel).remove(customerModel);
        return await ModelMapper.createCustomerDomain(result); 
    }

}
