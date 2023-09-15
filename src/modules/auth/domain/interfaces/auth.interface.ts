import * as mongoose from 'mongoose';

export interface IJwtFromRequest {
  client: string;
  iat: number;
  exp: number;
}

export interface IAuthorized {
  client: string;
  secret?: string;
  id?: mongoose.Types.ObjectId | string;
}
