import Sequelize from '@sequelize/core';
import { User } from '../models/user';

const host = String(process.env.DB_HOST || "localhost");
const port = Number(process.env.DB_PORT || "5432");
const database = String(process.env.DB_DATABASE || "poses_app");
const username = String(process.env.DB_USER || "postgres");
const password = String(process.env.DB_PASSWORD || "postgres");

export const db = new Sequelize({
    database,
    username,
    password,
    host,
    port,
    dialect: "postgres",
    models: [User]
});
