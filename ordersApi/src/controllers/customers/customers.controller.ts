import { Controller, Get, Param, Post, Body, UseFilters, BadRequestException, Inject, Query, Put } from '@nestjs/common';
import { CustomerDto } from 'src/dto/customer.dto';
import { validateOrReject } from 'class-validator';
import { AllExceptionsFilter } from 'src/exceptions/http-exception.filter';
import { ICustomersService } from 'src/services/customers/iCustomers.service';
import { EditCustomerDto } from 'src/dto/customer.edit.dto';

@Controller('customers')
export class CustomersController {

    constructor(@Inject('ICustomersService') private readonly customersService: ICustomersService) { }

    @Get(':id')
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
}