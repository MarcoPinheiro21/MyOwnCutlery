import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CustomersService } from 'src/services/customers/customers.service';
import { CustomerDto } from 'src/dto/customer.dto';

@Controller('customers')
export class CustomersController {

    constructor(private readonly customersService : CustomersService){

    }

    @Get()
    findById(@Param() customerId : string) {
        return this.customersService.findCustomer(customerId);
    }

    @Post()
    async createCustomer(@Body() customer : CustomerDto) {
        
    }
}
