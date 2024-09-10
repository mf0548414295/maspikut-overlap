import dotenv from "dotenv";
import express, { Express } from "express";
import cors from 'cors';
import { IncomingMessage, Server, ServerResponse } from "http";
import { connectToPostgresDB } from "./dbConnection";
import { forcesRouter } from "./resources/forces/forces.route";

const app: Express = express();
const corsOptions = { origin: 'http://localhost:5173', credentials: true };
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/forces',forcesRouter);

dotenv.config();

const PORT = process.env.port || 3000;
let server: Server<typeof IncomingMessage, typeof ServerResponse>;
connectToPostgresDB()
	.then(() => {
		server=app.listen(PORT, () => {
			console.log('\x1b[32m', `Server running on port ${PORT}...`);
		});
	})
	.catch(() => {});

// catch async errors
process.on('unhandledRejection', (err: Error) => {
	console.log('UNHANDLED REJECTION! 💥 Shutting down...');
	console.log(err, err.name, err.message);
	console.log(err.stack);
	// easy close the server
	server.close(() => {
		process.exit(1);
	});
});



