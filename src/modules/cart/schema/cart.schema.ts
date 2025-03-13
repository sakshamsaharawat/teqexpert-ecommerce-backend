import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { Types, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/modules/product/schemas/product.schema';

export type ListsDocument = Cart & Document;
@Schema({ timestamps: true })
export class Cart {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Product.name, required: true, index: true })
  product_id: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true, index: true })
  user_id: Types.ObjectId;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: false })
  is_deleted: boolean;
}

export const CartSchema = SchemaFactory.createForClass(Cart);