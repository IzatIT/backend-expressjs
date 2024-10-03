import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model } from '@sequelize/core';
import type { PartialBy } from '@sequelize/utils';

export type TodoAttributes = {
    id: number;
    title: string;
    enabled: boolean;
    did: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export type TodoCreationAttributes = {
    title: string;
    enabled: boolean;
    did: boolean;
};

export type TodoUpdateAttributes = {
    title?: string;
    enabled?: boolean;
    did?: boolean;
};

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare title: string;

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    declare did: boolean;

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    declare enabled: boolean;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare createdAt: Date;

    @Attribute(DataTypes.DATE)
    @NotNull
    declare updatedAt: Date;

}