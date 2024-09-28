import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique } from '@sequelize/core/decorators-legacy';
import { DataTypes, Model } from '@sequelize/core';
import type { PartialBy } from '@sequelize/utils';
import { USER_ROLES } from '../constants/user';

type UserRoleType = USER_ROLES.ADMIN
    | USER_ROLES.CLIENT
    | USER_ROLES.READER
    | USER_ROLES.SUPER_ADMIN

export type UserAttributes = {
    id: number;
    fullname: string;
    age: number;
    inn: string;
    sex: boolean;
    login: string;
    password: string;
    role: UserRoleType;
};

export type UserCreationAttributes = PartialBy<UserAttributes, 'id'>;

export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey
    @AutoIncrement
    declare id: number;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare fullname: string;

    @Attribute(DataTypes.INTEGER)
    @NotNull
    declare age: number;

    @Attribute(DataTypes.STRING)
    @Unique
    @NotNull
    declare inn: string;

    @Attribute(DataTypes.BOOLEAN)
    @NotNull
    declare sex: boolean;

    @Attribute(DataTypes.STRING)
    @Unique
    @NotNull
    declare login: string;

    @Attribute(DataTypes.STRING)
    @NotNull
    declare password: string;

    @Attribute(DataTypes.ENUM([USER_ROLES.ADMIN,
    USER_ROLES.CLIENT,
    USER_ROLES.READER,
    USER_ROLES.SUPER_ADMIN]))
    @NotNull
    declare role: UserRoleType;
}