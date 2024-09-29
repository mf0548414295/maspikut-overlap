import { Shortage } from '../Models/shortage.model';
import { axiosInstance } from './axios.service';

export const createShortage = async (newShortage: Shortage) => {
  return (await axiosInstance.post('shortages', newShortage)).data.data;
};

export const updateShortage = async (shortageId:number,fieldsToUpdate:Partial<Shortage>) => {
  return (await axiosInstance.patch(`shortages/${shortageId}`, fieldsToUpdate))
    .data.data;
};
