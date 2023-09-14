import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

@Schema({
  timestamps: { createdAt: 'createdAt' },
})
export class Transaction {
  @Transform(({ value }) => value.toString())
  _id?: mongoose.Types.ObjectId;

  @Prop({ required: true, type: String })
  type: string;

  @Prop({ required: true, type: String })
  date: string;

  @Prop({ required: true, type: Number })
  value: string;

  @Prop({ required: true, type: String })
  document: string;

  @Prop({ required: true, type: String })
  card: string;

  @Prop({ required: true, type: String })
  storeOwner: string;

  @Prop({ required: true, type: String })
  storeName: string;
}

export type TransactionDocument = Transaction & Document;

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
