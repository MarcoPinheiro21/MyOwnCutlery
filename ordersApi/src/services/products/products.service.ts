import { Injectable } from '@nestjs/common';
import { Product } from 'src/models/product.entity';
import { ProductDto } from '../../dto/product.dto';

@Injectable()
export class ProductsService {

    constructor() { }

    public async dtoToModel(productDto: ProductDto): Promise<Product> {
        return new Product(
            productDto.id,
            productDto.productId,
            productDto.quantity
        )
    }
}
