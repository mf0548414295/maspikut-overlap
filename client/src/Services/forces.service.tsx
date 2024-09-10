import { axiosInstance } from "./axios.service";
export const getCompetentForces=async ()=>{
  return (
    await axiosInstance.get("forces/competent")).data;
};

export const getIncompetentForces=async ()=>{
  return (
    await axiosInstance.get("forces/incompetent")).data;
};

