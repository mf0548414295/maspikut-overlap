
export interface Force {
	id: string;
	name: string;
	competence: 1 | 2 | 3;
	location: { coordinates: [number, number] };
	updatedAt: Date;
	createdAt: Date;
}
