import { RequestHandler } from 'express';
import { Force } from './forces.entity';
import { dbConnection } from '../../dbConnection';

export const getForces: RequestHandler = async (req, res) => {
  try {
    let forces;
    if (!req.params.type) {
      throw new Error('There was an error');
    }
    if (req.params.type === 'competent') {
      forces = await dbConnection
        .getRepository(Force)
        .createQueryBuilder('force')
        .leftJoin('Shortage', 'shortage', 'shortage.forceId = force.id')
        .groupBy('force.id')
        .having('COUNT(shortage.id) < 10')
        .getMany();
    } else if (req.params.type === 'incompetent') {
      forces = await dbConnection
        .getRepository(Force)
        .createQueryBuilder('force')
        .leftJoin('shortages', 'shortage', 'shortage.forceId = force.id')
        .groupBy('force.id')
        .having('COUNT(shortage.id) >= 10')
        .select([
          'force.id AS force_id',
          'force.name AS force_name',
          'force.competence AS force_competence',
          'force.location AS force_location',
          'array_agg(shortage.id) AS shortage_ids',
          'array_agg(shortage.name) AS shortage_names',
          'array_agg(shortage.status) AS shortage_statuses',
        ])
        .getRawMany();
    }
    res.status(200).send(forces);
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};

export const createForce: RequestHandler = async (req, res) => {
  try {
    const newForce = dbConnection.getRepository(Force).create(req.body);
    await dbConnection.getRepository(Force).save(newForce);
    res.status(201).json({
      status: 'success',
      data: newForce,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};

export const deleteForce: RequestHandler = async (req, res) => {
  try {
    const result = await dbConnection
      .getRepository(Force)
      .delete(req.params.id);
    if (!result.affected) {
      throw new Error('There was an error, deleting failed');
    }
    res.status(201).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('error');
  }
};
