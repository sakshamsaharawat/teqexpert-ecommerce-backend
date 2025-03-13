import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Body, Controller, Get, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/middlewares/logger.middleware";
import { CurrentUserType } from "@user/interface/current-user.interface";
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/tag-update.dto';
import { Cart } from './schema/cart.schema';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string, data: Cart[] }> {
        return this.cartService.findAll(user);
    }

    @Patch()
    @UseGuards(JwtAuthGuard)
    update(@Body() updatecartDto: UpdateCartDto, @CurrentUser() user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        return this.cartService.update(updatecartDto, user);
    }
}