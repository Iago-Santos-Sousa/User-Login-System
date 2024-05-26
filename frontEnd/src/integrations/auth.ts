import api from "./api";

type UserInfos = {
  cpf: string;
  password: string;
};

type UserResponse = {
  token: string;
  user: {
    cpf: string;
    email: string;
    nome: string;
  };
};

export const loginAPi = () => ({
  login: async ({
    cpf,
    password,
  }: UserInfos): Promise<UserResponse | undefined> => {
    try {
      const response = await api.post<UserResponse>("/login", {
        cpf,
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
