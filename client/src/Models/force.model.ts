export type Competence = 1 | 2 | 3;
export interface Force {
	id?: number;
	name: string;
	competence: Competence;
	location: { coordinates: [number, number] };
	updatedAt?: Date;
	createdAt?: Date;
}
