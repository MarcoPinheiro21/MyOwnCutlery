import { Controller, Get, Post, Body, Injectable, Inject, UseFilters, HttpException, BadRequestException, Param, Put, Query } from '@nestjs/common';
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
    findAll(@Query('includeCancelled') query : string) {
        return this.ordersService.findAll(query);
    }

    @Get(':id')
    @UseFilters(new AllExceptionsFilter())
    async findById(@Param('id') id){
        return await this.ordersService.findById(id);
    }

    @Post()
    @UseFilters(new AllExceptionsFilter())
    async createOrder(@Body() order: OrderDto) {
        await validateOrReject(order);
        return this.ordersService.createOrder(order);

    }

    @Put(':id/cancel')
    @UseFilters(new AllExceptionsFilter())
    async cancelOrder(@Param('id') id) {
        return await this.ordersService.cancelOrderById(id);

    }
}