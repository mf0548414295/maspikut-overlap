import { RequestHandler } from 'express';
import { Force } from './forces.entity';
import { dbConnection } from '../../dbConnection';
import { ShortageStatus } from '../shortages/shortages.entity';

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
          'force.id AS id',
          'force.name AS name',
          'force.competence AS competence',
          'ST_AsGeoJSON(force.location) AS location',
          'array_agg(shortage.id) AS shortage_ids',
          'array_agg(shortage.name) AS shortage_names',
          'array_agg(shortage.status::text) AS shortage_statuses',
        ])
        .getRawMany();
      forces = forces.map((force) => ({
        ...force,
        location: JSON.parse(force.location),
        shortage_statuses: force.shortage_statuses.map(
          (status: string) =>
            ShortageStatus[status as keyof typeof ShortageStatus]
        ),
      }));
    }
    res.status(201).json({
      status: 'success',
      data: forces,
    });
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
