import { RequestHandler } from 'express';
import { Force } from './forces.entity';
import { dbConnection } from '../../dbConnection';
import { Shortage } from '../shortages/shortages.entity';

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
				.leftJoinAndSelect('force.shortages', 'shortage') // assuming you have a relation defined between Force and Shortage
				.groupBy('force.id')
				.having('COUNT(shortage.id) >= 10')
				.select([
					'force.id',
					'force.name',
					'force.competence',
					'force.location',
					'shortage.id',
					'shortage.name',
					'shortage.status',
				])
				.getMany();
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
		const result = await dbConnection.getRepository(Force).delete(req.params.id);
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
