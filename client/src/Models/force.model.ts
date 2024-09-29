import { ShortageStatus } from "./shortage.model";

export type Competence = 1 | 2 | 3;
export interface Force {
  id?: number;
  name: string;
  competence: Competence;
  location: { coordinates: [number, number] };
  shortage_ids?: number[];
  shortage_names?: string[];
  shortage_statuses?:ShortageStatus[];
  updatedAt?: Date;
  createdAt?: Date;
}
