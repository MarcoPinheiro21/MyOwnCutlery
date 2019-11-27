import { Controller, Get, Param, Post, Body, UseFilters, BadRequestException } from '@nestjs/common';
import { CustomersService } from 'src/services/customers/customers.service';
import { CustomerDto } from 'src/dto/customer.dto';
import { validateOrReject } from 'class-validator';
import { AllExceptionsFilter } from 'src/exceptions/http-exception.filter';

@Controller('customers')
export class CustomersController {

    constructor(private readonly customersService: CustomersService) { }

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
        try{
            await validateOrReject(customer);
            return this.customersService.createCustomer(customer);
        } catch(errors) {
            throw new BadRequestException(errors);
        }
    }

    @Post(':id')
    async forgetCustomer(@Param('id') id) {
        try{
            return this.customersService.forgetCustomerData(id);
        } catch(errors) {
            throw new BadRequestException(errors);
        }
    }
}