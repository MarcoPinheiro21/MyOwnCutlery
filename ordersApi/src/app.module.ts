import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersController } from './controllers/orders/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { Order } from './models/order.entity';
import { Product } from './models/product.entity';
import { Customer } from './models/customer.entity';
import { OrdersService } from './services/orders/orders.service';
import { CustomersService } from './services/customers/customers.service';
import { ProductsService } from './services/products/products.service';
import { Repository } from 'typeorm';
import { CustomersController } from './controllers/customers/customers.controller';


@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "mongodb",
    "url": "mongodb+srv://lapr5:yourStrong(!)Password@cluster0-r18xz.mongodb.net/test?retryWrites=true&w=majority",
    "entities": [Order, Product, Customer],
    "synchronize": true
  })],
  controllers: [OrdersController, CustomersController],
  providers: [
    OrdersService,
    { provide: 'IOrdersService', useClass: OrdersService } ,
    { provide: 'ICustomersService', useClass: CustomersService } ,
    { provide: 'IProductsService', useClass: ProductsService } ,
    AppService, 
    Repository]
})
export class AppModule { }