import { Sector } from "../../Models/SectorModel";
import { handleError } from "../../utils/servicesErrorHandler";
import axiosInstance from "../AxiosInstance";
export const sectorServices = {
  getAllSectors: async (): Promise<Sector[]> => {
    try {
      const response = await axiosInstance.get("/sectors");
      return response.data.data.items;
    } catch (error) {
      handleError(error);
      throw new Error("Error fetching sectors");
    }
  },

  seedSectors: async (): Promise<any> => {
    try {
      const response = await axiosInstance.get("/sectors/seed-sectors");
      return response.data;
    } catch (error) {
      handleError(error);
      throw new Error("Error fetching sectors");
    }
  },
};
