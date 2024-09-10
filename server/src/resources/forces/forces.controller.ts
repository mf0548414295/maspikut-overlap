import { RequestHandler } from 'express';
import { Force } from './forces.entity';
import { dbConnection } from '../../dbConnection';

export const getForces: RequestHandler = async (req, res) => {
	try {
        let forces;
		if (req.params.type === 'competent') {
            forces=await dbConnection.getRepository(Force)
            .createQueryBuilder("force")
            .leftJoin("Shortage", "shortage", "shortage.forceId = force.id")
            .groupBy("force.id")
            .having("COUNT(shortage.id) < 10")
            .getMany();
		};
		res.status(200).send(forces);
	} catch (err) {
		console.error(err);
		res.status(500).send('error');
	}
};
