
import { IsBoolean, IsMongoId, IsNotEmpty } from 'class-validator';

export class UpdateCartDto {
  @IsNotEmpty({ message: 'Product ID is required.' })
  @IsMongoId({ message: 'Invalid Product ID.' })
  productId: string;

  @IsNotEmpty({ message: "update value missing." })
  @IsBoolean({ message: "update value must be boolean"})
  isAdded: boolean;
}