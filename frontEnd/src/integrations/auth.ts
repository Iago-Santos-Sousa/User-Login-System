import api from "./api";

type UserInfos = {
  email: string;
  password: string;
};

interface UserResponse {
  token?: string;
  user: {
    email: string;
    nome: string;
    userId: number;
  };
}

export const loginAPi = () => ({
  login: async ({
    email,
    password,
  }: UserInfos): Promise<UserResponse | undefined> => {
    try {
      const response = await api.post<UserResponse>("/api/users/login", {
        email,
        password,
      });

      console.log(response);
      return response.data;
    } catch (error: unknown) {
      if (typeof error === "string") {
        console.log(error.toUpperCase());
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
  },
});
