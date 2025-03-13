import { JwtAuthGuard } from 'src/middlewares/logger.middleware';
import { Body, Controller, Delete, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CurrentUserType } from '../user/interface/current-user.interface';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProduct } from './interface/create-product.interface';
import { Product } from './schemas/product.schema';

@Controller('product')
export class ProductController {
    constructor(private readonly ProductService: ProductService) { }

    @Post("create")
    @UseGuards(JwtAuthGuard)
    create(@Body() createProductDto: CreateProductDto, @CurrentUser() user: CurrentUserType): Promise<CreateProduct> {
        return this.ProductService.create(createProductDto, user);
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Product[] }> {
        return this.ProductService.findAll(user);
    }
}