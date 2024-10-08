"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToPostgresDB = exports.dbConnection = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const configPostgresDb = {
    synchronize: false,
    logging: process.env.DB_LOGGING === 'true',
    host: process.env.DB_HOST ?? 'localhost',
    port: +(process.env.DB_PORT ?? 5432),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    schema: process.env.DB_SCHEMA ?? 'public',
    database: process.env.DB_NAME ?? 'maspikut',
    ssl: false,
};
exports.dbConnection = new typeorm_1.DataSource({
    type: 'postgres',
    entities: [`${__dirname}/resources/**/*entity{.ts,.js}`],
    ...configPostgresDb,
});
const connectToPostgresDB = async () => {
    try {
        await exports.dbConnection.initialize();
        console.log('Connected to postgres db!');
    }
    catch (error) {
        console.log(`There was an error connecting to db: ${error.stack}`);
        throw error;
    }
};
exports.connectToPostgresDB = connectToPostgresDB;
