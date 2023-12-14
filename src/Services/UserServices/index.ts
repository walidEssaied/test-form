import { UserFormModel, UsersListItem } from "../../Models/UserModel";
import { handleError } from "../../utils/servicesErrorHandler";
import { sleep } from "../../utils/sleep";
import axiosInstance from "../AxiosInstance";

export const userService = {
  getAllUsers: async (): Promise<UsersListItem[]> => {
    await sleep(500);
    try {
      const response = await axiosInstance.get("/users");
      return response.data.data.items;
    } catch (error) {
      handleError(error);
      throw new Error("Error fetching users");
    }
  },

  updateUser: async (
    item: UserFormModel & { id: number }
  ): Promise<UsersListItem> => {
    await sleep(500);
    try {
      const response = await axiosInstance.put(`/users/${item.id}`, item);
      return response.data;
    } catch (error) {
      handleError(error);
      throw new Error("Error updating user");
    }
  },

  createUser: async (item: UserFormModel): Promise<UsersListItem> => {
    await sleep(500);
    try {
      const response = await axiosInstance.post(`/users`, item);
      return response.data;
    } catch (error) {
      handleError(error);
      throw new Error("Error creating user");
    }
  },

  getOneUser: async (id: number): Promise<UsersListItem> => {
    await sleep(500);
    try {
      const response = await axiosInstance.get(`/users/${id}`);
      return response.data.data.items;
    } catch (error) {
      handleError(error);
      throw new Error("Error fetching user");
    }
  },

  deleteUser: async (id: number): Promise<void> => {
    await sleep(500);
    try {
      await axiosInstance.delete(`/users/${id}`);
    } catch (error) {
      handleError(error);
      throw new Error("Error deleting user");
    }
  },
};

export default userService;
