import { Controller, Get, Post, Body, Injectable, Inject, UseFilters, Param, Put, Query, Delete } from '@nestjs/common';
import { OrderDto } from '../../dto/order.dto';
import { AllExceptionsFilter } from '../../exceptions/http-exception.filter';
import { validateOrReject } from "class-validator";
import { IOrdersService } from '../../services/orders/iOrders.service';
import { EditOrderDto } from '../../dto/order.edit.dto';


@Controller('orders')
export class OrdersController {

    constructor(@Inject('IOrdersService') private readonly ordersService: IOrdersService) {
    }

    @Get()
    findAll(@Query('includeCancelled') query: string) {
        return this.ordersService.findAll(query);
    }

    @Get('info')
    @UseFilters(new AllExceptionsFilter())
    async orderInfo() {
        return await this.ordersService.findAllOrdersInfo();
    }

    @Get(':id')
    @UseFilters(new AllExceptionsFilter())
    async findById(@Param('id') id) {
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

    @Put(':id')
    @UseFilters(new AllExceptionsFilter())
    async updateOrder(@Param('id') id, @Body() orderEdit: EditOrderDto) {
        return await this.ordersService.updateOrder(id, orderEdit);
    }

    @Put(':id/:expectedDeliveryDate')
    @UseFilters(new AllExceptionsFilter())
    async updateExpectedDeliveryDate(@Param('id') id, @Param('expectedDeliveryDate') date) {
        return await this.ordersService.updateExpectedDeliveryDate(id, date);
    }

    @Delete(':id')
    @UseFilters(new AllExceptionsFilter())
    async deleteOrder(@Param('id') id) {
        return await this.ordersService.deleteOrder(id);
    }
}