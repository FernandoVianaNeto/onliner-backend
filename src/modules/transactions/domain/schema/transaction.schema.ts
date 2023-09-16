import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { ETransactionsType } from '../enums/transactions-type.enum';

@Schema({
  timestamps: { createdAt: 'createdAt' },
})
export class Transaction {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.Types.ObjectId;

  @Prop({ required: true, type: Number, enum: ETransactionsType })
  type: number;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, type: Number })
  value: number;

  @Prop({
    required: true,
    type: String,
  })
  document: string;

  @Prop({ required: true, type: String })
  card: string;

  @Prop({ required: true, type: String })
  storeOwner: string;

  @Prop({ required: true, type: String })
  storeName: string;

  @Prop({ required: false, type: Boolean, default: true })
  success: boolean;

  @Prop({ required: false, type: String })
  errorMessage: string;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
