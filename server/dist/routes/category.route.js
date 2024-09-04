"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const category_controller_1 = require("../controllers/category.controller");
exports.categoryRoutes = express_1.default.Router();
exports.categoryRoutes
    .get("/", category_controller_1.getAllCategories);
