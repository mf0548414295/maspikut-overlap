import { RequestHandler } from 'express';
import { dbConnection } from '../../dbConnection';
import { Shortage, ShortageStatus } from './shortages.entity';

export const createShortage: RequestHandler = async (req, res) => {
  try {
    const { forceId, status } = req.body;
    let newShortage = {
      ...req.body,
      force: forceId,
      status: ShortageStatus[status],
    };
    newShortage = dbConnection.getRepository(Shortage).create(newShortage);
    newShortage = await dbConnection.getRepository(Shortage).save(newShortage);
    res.status(201).json({
      status: 'success',
      data: newShortage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};

export const updateShortage: RequestHandler = async (req, res) => {
  try {
    const { status } = req.body;
    let fieldsToUpdate;
    if(status){
        fieldsToUpdate = {
          ...req.body,
          status: ShortageStatus[status],
        };
    } else{
        fieldsToUpdate=req.body;
    }
    const updatedShortage = await dbConnection
      .getRepository(Shortage)
      .update(req.params.id, fieldsToUpdate);
    res.status(201).json({
      status: 'success',
      data: updatedShortage,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};
