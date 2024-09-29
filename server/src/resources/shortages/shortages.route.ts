import express from 'express';
import { createShortage, updateShortage } from './shortages.controller';

export const shortagesRouter = express.Router();

shortagesRouter
  .post('/', createShortage)
  .patch('/:id', updateShortage);
