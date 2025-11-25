import { Schema } from "mongoose";

export interface CartProduct {
  id: string; 
  title: string;
  price: number;
  quantity: number;
}

export const CartProductSchema = new Schema<CartProduct>({
  id: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true }
});
