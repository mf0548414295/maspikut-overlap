export enum ShortageStatus {
	OPEN = 1,
	IN_PROGRESS = 2,
	CLOSED = 3,
}

export interface Shortage {
	id?: number,
	forceId: number,
	name: string,
	status: ShortageStatus,
	updatedAt?: Date,
	createdAt?: Date
}
