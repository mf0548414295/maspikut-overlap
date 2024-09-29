"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dbConnection_1 = require("./dbConnection");
const forces_route_1 = require("./resources/forces/forces.route");
const shortages_route_1 = require("./resources/shortages/shortages.route");
const app = (0, express_1.default)();
const corsOptions = { origin: 'http://localhost:5173', credentials: true };
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use('/api/forces', forces_route_1.forcesRouter);
app.use('/api/shortages', shortages_route_1.shortagesRouter);
dotenv_1.default.config();
const PORT = process.env.port || 3000;
let server;
(0, dbConnection_1.connectToPostgresDB)()
    .then(() => {
    server = app.listen(PORT, () => {
        console.log('\x1b[32m', `Server running on port ${PORT}...`);
    });
})
    .catch(() => { });
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err, err.name, err.message);
    console.log(err.stack);
    server.close(() => {
        process.exit(1);
    });
});
