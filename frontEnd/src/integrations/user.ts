import api from "./api";

import { AxiosResponse } from "axios";

type UserInfo = {
  userName: string;
  email: string;
  cpf: string;
  password: string;
};

export const user = () => ({
  createUser: async (userInfo: UserInfo): Promise<number | null> => {
    try {
      const { userName, email, cpf, password } = userInfo;

      const response: AxiosResponse = await api.post("/create-user", {
        userName,
        email,
        cpf,
        password,
      });

      console.log(response);

      return response.status;
    } catch (error) {
      if (typeof error === "string") {
        console.log(error.toUpperCase());
        return null;
      } else if (error instanceof Error) {
        console.log(error.message);
        return null;
      }

      return null;
    }
  },

  uploadImage: async () => {},
});
