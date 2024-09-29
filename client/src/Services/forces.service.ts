import { Force } from '../Models/force.model';
import { axiosInstance } from './axios.service';
export const getCompetentForces = async () => {
  return (await axiosInstance.get('forces/competent')).data.data;
};

export const getIncompetentForces = async () => {
  return (await axiosInstance.get('forces/incompetent')).data.data;
};

export const createForce = async (newForce: Force) => {
  return (await axiosInstance.post('forces', newForce)).data.data;
   
};

export const deleteForce = async (forceId: number) => {
  return (await axiosInstance.delete(`forces/${forceId}`)).data;
};
