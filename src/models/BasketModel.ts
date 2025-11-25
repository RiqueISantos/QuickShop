import { Schema, Document, model } from 'mongoose';
import { BasketStatus } from '../enums/BasketStatus';
import { PaymentMethod } from '../enums/PaymentMethod';
import { CartProduct, CartProductSchema } from './ProductModel';

export interface Basket extends Document{
    clientId: string;
    products: CartProduct[];
    totalPrice: number;
    status: BasketStatus;
    paymentMethod: PaymentMethod;
}

const BasketSchema = new Schema<Basket>({
  clientId: { type: String, required: true },
  products: [CartProductSchema],
  totalPrice: { type: Number, required: true, default: 0 },
  status: { type: String, enum: Object.values(BasketStatus), default: BasketStatus.OPEN },
  paymentMethod: { type: String, enum: Object.values(PaymentMethod), default: PaymentMethod.NONE }
}, { timestamps: true });

const BasketModel = model<Basket>("Basket", BasketSchema);

export default BasketModel;