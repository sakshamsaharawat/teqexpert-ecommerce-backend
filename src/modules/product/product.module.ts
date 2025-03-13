import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { UserModule } from '@user/user.module';
import { Product, ProductSchema } from './schemas/product.schema';
import { Cart, CartSchema } from '../cart/schema/cart.schema';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Product.name, schema: ProductSchema },
            { name: Cart.name, schema: CartSchema }
        ]),
        UserModule,
    ],
    controllers: [ProductController],
    providers: [ProductService, JwtAuthGuard],
})
export class ProductModule { }