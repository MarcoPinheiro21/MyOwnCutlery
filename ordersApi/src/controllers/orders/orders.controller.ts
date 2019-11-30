import { Controller, Get, Post, Body, Injectable, Inject, UseFilters, HttpException, BadRequestException, Param, Put } from '@nestjs/common';
import { OrdersService } from 'src/services/orders/orders.service';
import { OrderDto } from '../../dto/order.dto';
import { AllExceptionsFilter } from 'src/exceptions/http-exception.filter';
import { validateOrReject, validate, ValidationError } from "class-validator";
import { IOrdersService } from 'src/services/orders/iOrders.service';


@Controller('orders')
export class OrdersController {

    constructor(@Inject('IOrdersService') private readonly ordersService: IOrdersService) {
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

    @Put('customer/:id/cancel')
    @UseFilters(new AllExceptionsFilter())
    async cancelOrderByCustomerId(@Param('id') id) {
        return this.ordersService.cancelOrderByCustomerId(id);

    }
}