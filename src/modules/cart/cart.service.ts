import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CurrentUserType } from '@user/interface/current-user.interface';
import { Cart } from './schema/cart.schema';
import { UpdateCartDto } from './dto/tag-update.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectModel('Cart')
        private readonly cartModel: Model<Cart>,
    ) { }

    async findAll(user: CurrentUserType): Promise<{ success: boolean, message: string, data: Cart[] }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        const cart = await this.cartModel.find({ user_id, is_deleted: false });
        return { success: true, message: cart.length ? "Cart fetched successfully." : "Cart not found", data: cart };
    }

    async update(updatecartDto: UpdateCartDto, user: CurrentUserType): Promise<{ success: boolean, message: string }> {
        const user_id = new mongoose.Types.ObjectId(user.id);
        if (updatecartDto.isAdded) {
            const isProductAlreadyInCart = await this.cartModel.findOne({ user_id, product_id: updatecartDto.productId, is_deleted: false });
            if (isProductAlreadyInCart) {
                await this.cartModel.findByIdAndUpdate(isProductAlreadyInCart._id, { $inc: { quantity: 1 } });
            } else {
                await this.cartModel.create({
                    user_id,
                    product_id: updatecartDto.productId,
                    quantity: 1
                })
            }
            return { success: true, message: "Cart updated successfully." };
        } else {
            const isProductAlreadyInCart = await this.cartModel.findOne({ user_id, product_id: updatecartDto.productId, is_deleted: false });
            if (isProductAlreadyInCart) {
                if (isProductAlreadyInCart.quantity === 1) {
                    await this.cartModel.findByIdAndUpdate(isProductAlreadyInCart._id, { is_deleted: true });
                } else {
                    await this.cartModel.findByIdAndUpdate(isProductAlreadyInCart._id, { $inc: { quantity: -1 } });
                }
            }
            return { success: true, message: "Cart updated successfully." };
        }
    }
}