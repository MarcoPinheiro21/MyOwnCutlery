import { Module, HttpModule } from '@nestjs/common';
import { OrdersController } from './controllers/orders/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrdersService } from './services/orders/orders.service';
import { CustomersService } from './services/customers/customers.service';
import { Repository } from 'typeorm';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersRepository } from './repository/customers.repository';
import { OrdersRepository } from './repository/orders.repository';
import { OrderModel } from './models/order.entity';
import { ProductModel } from './models/product.entity';
import { CustomerModel } from './models/customer.entity';
import { OrderInfoModel } from './models/orderInfo.entity';


@Module({
  imports: [HttpModule, TypeOrmModule.forRoot({
    "type": "mongodb",
    "url": "mongodb+srv://lapr5:yourStrong(!)Password@cluster0-r18xz.mongodb.net/test?retryWrites=true&w=majority",
    "entities": [OrderModel, ProductModel, CustomerModel, OrderInfoModel],
    "synchronize": true
  })],
  controllers: [OrdersController, CustomersController],
  providers: [
    OrdersService,
    { provide: 'IOrdersService', useClass: OrdersService },
    { provide: 'ICustomersService', useClass: CustomersService },
    { provide: 'IOrdersRepository', useClass: OrdersRepository },
    { provide: 'ICustomersRepository', useClass: CustomersRepository },
    CustomersService,
    Repository]
})
export class AppModule { }