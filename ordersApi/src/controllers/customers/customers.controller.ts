import { Controller, Get, Param, Post, Body, UseFilters, Inject, Put, Delete } from '@nestjs/common';
import { CustomerDto } from '../../dto/customer.dto';
import { validateOrReject } from 'class-validator';
import { AllExceptionsFilter } from '../../../src/exceptions/http-exception.filter';
import { ICustomersService } from '../../services/customers/iCustomers.service';
import { EditCustomerDto } from '../../dto/customer.edit.dto';

@Controller('customers')
export class CustomersController {

    constructor(@Inject('ICustomersService') private readonly customersService: ICustomersService) { }

    @Get(':id')
    @UseFilters(new AllExceptionsFilter())
    async findById(@Param('id') id) {
        return this.customersService.findById(id);
    }

    @Get()
    async findAll() {
        return this.customersService.findAll();
    }

    @Post()
    @UseFilters(new AllExceptionsFilter())
    async createCustomer(@Body() customer: CustomerDto) {
        await validateOrReject(customer);
        return this.customersService.createCustomer(customer);
    }

    @Post('forget/:id')
    async forgetCustomer(@Param('id') id) {
        return this.customersService.forgetCustomerData(id);
    }

    @Put(':id')
    @UseFilters(new AllExceptionsFilter())
    async changeCustomer(@Param('id') customerId, @Body() customer: EditCustomerDto) {
        return await this.customersService.editCustomerData(customerId, customer);
    }

    @Delete(':id')
    @UseFilters(new AllExceptionsFilter())
    async deleteCustomer(@Param('id') id){
        return await this.customersService.deleteCustomer(id);
    }
}