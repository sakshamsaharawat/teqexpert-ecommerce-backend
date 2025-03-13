import { Product } from "../schemas/product.schema";

export interface CreateProduct {
    success: boolean;
    message: string;
    data: Product;
}