import { axiosInstance } from "./axios.util";
export const getCategories=async ()=>{
  return (
    await axiosInstance.get("/category", )).data
};
