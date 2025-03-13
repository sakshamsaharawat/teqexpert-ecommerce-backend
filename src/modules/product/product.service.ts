import { CurrentUser } from './../../common/decorators/current-user.decorator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { Product } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProduct } from './interface/create-product.interface';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel('Product')
        private readonly productModel: Model<Product>
    ) { }

    async create(createProductDto: CreateProductDto, user: CurrentUserType): Promise<CreateProduct> {
        const user_id = new mongoose.Types.ObjectId(user.id);

        const newProduct = new Product();
        newProduct.title = createProductDto.title;
        newProduct.description = createProductDto.description;
        newProduct.user_id = user_id;
        newProduct.image_url = createProductDto.image_url;
        newProduct.price = createProductDto.price;
        const product = await this.productModel.create(newProduct);
        return { success: true, message: "Product created successfully.", data: product };
    }

    async findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Product[] }> {
        const products = await this.productModel.find({ is_deleted: false })

        return { success: true, message: "Products fetched successfully.", data: products, };
    }
}