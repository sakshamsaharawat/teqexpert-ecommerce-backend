import { BooleanMessage } from "./boolean-message.interface";
import { Cart } from "../schema/cart.schema";

export interface FindAll extends BooleanMessage {
    data: Cart[];
}