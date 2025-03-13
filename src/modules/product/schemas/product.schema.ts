import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@user/schema/user.schema';
import { Document, Schema as MongooseSchema, Types } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: [true, 'User ID is required'],
  })
  user_id: Types.ObjectId;

  @Prop({
    required: [true, 'Title is required'],
    trim: true,
    minlength: [3, 'Title must be at least 3 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
  })
  title: string;

  @Prop({
    default: '',
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters'],
  })
  description: string;

  @Prop({ required: false, trim: true, maxlength: 300 })
  image_url: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_deleted: boolean;
}
export const ProductSchema = SchemaFactory.createForClass(Product);