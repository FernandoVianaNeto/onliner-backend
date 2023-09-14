import { Document, FilterQuery, PopulateOptions, UpdateQuery } from 'mongoose';

export type TFind<T extends Document> = {
  matchFilter: FilterQuery<T>;
  select?: string;
  populate?: Array<PopulateOptions>;
  sort?: any;
  take?: number;
  skip?: number;
};

export type TFindOneAndUpdate<T extends Document> = {
  entityFilterQuery: FilterQuery<T>;
  updateEntityData: UpdateQuery<unknown>;
  showUpdated?: boolean;
  upsert?: boolean;
};

export type TFindOne<T extends Document> = {
  matchFilter: FilterQuery<T>;
  projection?: Record<string, unknown>;
  populate?: Array<PopulateOptions>;
};
