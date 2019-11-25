import { Controller, Get, Post, Body, Injectable, Inject, UseFilters, HttpException, BadRequestException } from '@nestjs/common';
import { OrdersService } from 'src/services/orders/orders.service';
import { OrderDto } from '../../dto/order.dto';
import { AllExceptionsFilter } from 'src/exceptions/http-exception.filter';
import { validateOrReject, validate, ValidationError } from "class-validator";


@Controller('orders')
export class OrdersController {

    constructor(private readonly ordersService: OrdersService) {
    }

    @Get()
    findAll() {
        return this.ordersService.getAll();
    }

    @Post()
    @UseFilters(new AllExceptionsFilter())
    async save(@Body() order: OrderDto) {

        try {
            await validateOrReject(order);
            return this.ordersService.saveOrder(order);
        } catch (errors) {
            throw new BadRequestException(errors);
        }

    }
}