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
        return this.ordersService.findAll();
    }

    @Post()
    @UseFilters(new AllExceptionsFilter())
    async createOrder(@Body() order: OrderDto) {
        await validateOrReject(order);
        return this.ordersService.createOrder(order);

    }
}