import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  UpdateQuery,
  PopulateOptions,
} from 'mongoose';
import * as mongoose from 'mongoose';
import { TFind, TFindOneAndUpdate } from './types';

export abstract class EntityRepository<T extends Document> {
  constructor(protected readonly entityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
    populate?: PopulateOptions,
  ): Promise<T | null> {
    const query = this.entityModel.findOne(entityFilterQuery, {
      __v: 0,
      ...projection,
    });
    query.populate(populate);
    return query.exec();
  }

  async findDistinct({
    entityFilterQuery,
    select,
    distinct,
  }: {
    entityFilterQuery: FilterQuery<T>;
    select?: string;
    distinct?: string;
  }): Promise<T[] | null> {
    const query = this.entityModel
      .find(entityFilterQuery, select)
      .distinct(distinct);

    return query.exec();
  }

  async newFind(findParams: TFind<T>): Promise<T[] | null> {
    const { matchFilter, select, populate, sort, take, skip } = findParams;

    const query = this.entityModel
      .find(matchFilter, select)
      .sort(sort)
      .limit(take)
      .skip(skip);
    query.populate(populate);

    return query.exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    select?: string,
    populate?: PopulateOptions,
    sort?: any,
    take?: number,
    skip?: number,
  ): Promise<T[] | null> {
    const query = this.entityModel
      .find(entityFilterQuery, select)
      .sort(sort)
      .limit(take)
      .skip(skip);
    query.populate(populate);
    return query.exec();
  }

  async findByIdAndUpdate(
    id: mongoose.Types.ObjectId,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    return this.entityModel.findByIdAndUpdate(id, updateEntityData, {
      new: true,
    });
  }

  async create(createEntityData: unknown): Promise<T> {
    const entity = new this.entityModel(createEntityData);
    await entity.save();

    return entity;
  }

  async insertMany(createEntitiesData: unknown[]): Promise<T[]> {
    return this.entityModel.insertMany(createEntitiesData);
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      {
        $set: updateEntityData,
      },
      {
        new: true,
      },
    );
  }

  async newFindOneAndUpdate({
    entityFilterQuery,
    updateEntityData,
    showUpdated = false,
    upsert = false,
  }: TFindOneAndUpdate<T>): Promise<T | null> {
    return this.entityModel.findOneAndUpdate(
      entityFilterQuery,
      {
        $set: updateEntityData,
      },
      {
        new: showUpdated,
        upsert: upsert,
      },
    );
  }

  async countDocuments(entityFilterQuery: FilterQuery<T>): Promise<number> {
    const count = await this.entityModel.countDocuments(entityFilterQuery);
    return count;
  }

  async updateMany(
    entityFilterQuery: FilterQuery<T>,
    updateEntityData: UpdateQuery<unknown>,
  ) {
    const updatedResult = await this.entityModel.updateMany(entityFilterQuery, {
      $set: updateEntityData,
    });

    return updatedResult;
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deletedResult = await this.entityModel.deleteOne(entityFilterQuery);
    return deletedResult.deletedCount >= 1;
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<T> {
    const deletedResult = await this.entityModel.findOneAndDelete(
      entityFilterQuery,
    );

    return deletedResult;
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.entityModel.deleteMany(entityFilterQuery);
    return deleteResult.deletedCount >= 1;
  }

  async aggregate(aggregateOptions: PipelineStage[]): Promise<any> {
    const query = this.entityModel.aggregate(aggregateOptions);
    return query;
  }
}
