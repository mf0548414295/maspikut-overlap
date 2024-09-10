import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();
const configPostgresDb: Partial<PostgresConnectionOptions> = {
	synchronize: false,
	logging: process.env.DB_LOGGING === 'true',
	host: process.env.DB_HOST ?? 'localhost',
	port: +(process.env.DB_PORT ?? 5432),
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	schema: process.env.DB_SCHEMA ?? 'public',
	database: process.env.DB_NAME ?? 'maspikut',
	ssl: JSON.parse(process.env.DB_SSL ?? 'true'),
};

export const dbConnection = new DataSource({
	type: 'postgres',
	entities: [`${__dirname}/resources/**/*entity{.ts,.js}`],
	...configPostgresDb,
});





// async function createTrigger() {
//     await dbConnection.query(`
//         CREATE OR REPLACE FUNCTION log_competence_change() 
//         RETURNS TRIGGER AS $$
//         BEGIN
//             INSERT INTO audit_forces (force_id, old_competence, new_competence)
//             VALUES (NEW.id, OLD.competence, NEW.competence);
//             RETURN NEW;
//         END;
//         $$ LANGUAGE plpgsql;

//         CREATE TRIGGER competence_change
//         AFTER UPDATE OF competence ON forces
//         FOR EACH ROW EXECUTE FUNCTION log_competence_change();
//     `);
// }




export const connectToPostgresDB = async () => {
	try {
		await dbConnection.initialize();
		// await createTrigger();
		console.log('Connected to postgres db!');
	} catch (error:any) {
		console.log(`There was an error connecting to db: ${error.stack}`);
		throw error;
	}
};
