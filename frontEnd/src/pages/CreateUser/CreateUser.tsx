import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import userIcon from "../../assets/user-icon.svg";
import userCreate from "../../assets/user-circle.svg";
import passwordIcon from "../../assets/password-icon.svg";
import emailIcon from "../../assets/email-icon.svg";
import cpfIcon from "../../assets/register-icon.svg";
import userName from "../../assets/user-name-icon.svg";
import { useLogin } from "../../context/AppProvider";
import { user } from "../../integrations/user";
import { loginAPi } from "../../integrations/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import Mask from "../../utils/Mask";

type Inputs = {
  cpf: string;
  password: string;
  userName: string;
  email: string;
};

const CreateUser = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const handleCreateUser = async (data: Inputs): Promise<void> => {
    try {
      const result: number | null = await user().createUser(data);
      if (result !== 200) {
        throw new Error("Não foi possível criar usuário!");
      }
      console.log(result);
      console.log("Usauuário criado com sucesso!");
    } catch (error) {
      setError("cpf", { type: "focus" }, { shouldFocus: true });
      setError("password", { type: "focus" }, { shouldFocus: true });
      setError("userName", { type: "focus" }, { shouldFocus: true });
      setError("email", { type: "focus" }, { shouldFocus: true });
      if (typeof error === "string") {
        console.log(error.toUpperCase());
      } else if (error instanceof Error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="wrapper min-h-screen py-12">
      <div className="login-page bg-white px-10 py-6 border rounded-lg mt-0 mx-auto max-w-[min(80%,450px)]">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <div className="w-[100px] h-[100px] mx-auto">
            <img src={userCreate} alt="create-user" className="w-full h-full" />
          </div>

          <div className="w-full">
            <label
              htmlFor="userName"
              className="text-sm text-spanTwoColor w-full"
            >
              User name
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="userName"
                id="userName"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-prymaryPurple"
                {...register("userName", {
                  required: true,
                })}
                aria-required={errors.userName ? true : false}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={userName} alt="" width={20} height={20} />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="email" className="text-sm text-spanTwoColor w-full">
              Email
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="email"
                id="email"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-prymaryPurple"
                {...register("email", {
                  required: true,
                  // onChange: (e) => {
                  //   e.target.value = Mask.CPF(e.target.value);
                  // },
                })}
                aria-required={errors.email ? true : false}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={emailIcon} alt="" width={20} height={20} />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label htmlFor="cpf" className="text-sm text-spanTwoColor w-full">
              CPF
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="cpf"
                id="cpf"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-prymaryPurple"
                {...register("cpf", {
                  required: true,
                  onChange: (e) => {
                    e.target.value = Mask.CPF(e.target.value);
                  },
                })}
                aria-required={errors.cpf ? true : false}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={cpfIcon} alt="" width={20} height={20} />
              </div>
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="password"
              className="text-sm text-spanTwoColor w-full"
            >
              Password
            </label>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="password"
                id="password"
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-prymaryPurple"
                {...register("password", {
                  required: true,
                })}
                aria-required={errors.password ? true : false}
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <img src={passwordIcon} alt="" width={20} height={20} />
              </div>
            </div>
          </div>

          <div className="text-center text-white">
            <button
              className="bg-purple-500 text-base w-full rounded-full py-3 opacity-70 hover:opacity-100"
              type="submit"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
