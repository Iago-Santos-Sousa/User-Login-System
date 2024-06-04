import { useEffect } from "react";
import { useNavigate, NavigateFunction, Link } from "react-router-dom";
import userIcon from "../../assets/user-icon.svg";
import passwordIcon from "../../assets/password-icon.svg";
import { useLogin } from "../../context/AppProvider";
import { loginAPi } from "../../integrations/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import Mask from "../../utils/Mask";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const signIn = useLogin()?.signIn;
  const navigate: NavigateFunction = useNavigate();

  // fazer a loginca de chamar o login do backend e salvar os dados no contexto
  const handleSignIn: SubmitHandler<Inputs> = async (data): Promise<void> => {
    const auth = await loginAPi().login(data);

    if (auth?.user) {
      await signIn!(auth.user, auth.token);
      navigate("panel");
    } else {
      setError("email", { type: "focus" }, { shouldFocus: true });
      setError("password", { type: "focus" }, { shouldFocus: true });
    }
  };

  return (
    <div className="wrapper min-h-screen py-12">
      <div className="login-page bg-white px-10 py-6 border rounded-lg mt-0 mx-auto max-w-[min(80%,450px)]">
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <h1 className="text-center text-4xl font-bold">Login</h1>

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
                <img src={userIcon} alt="" width={20} height={20} />
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

          <div className="text-sm	text-spanColor text-end">
            <span>Forgot password?</span>
          </div>

          <div className="text-center text-white">
            <button
              className="bg-purple-500 text-base w-full rounded-full py-3 opacity-70 hover:opacity-100"
              type="submit"
            >
              LOGIN
            </button>
          </div>

          {/* <div className="text-center text-sm text-spanColor">
            <span>Or sign up using</span>
          </div> */}

          <div className="text-center text-sm text-spanTwoColor">
            <Link to={"/create-user"}>SIGN UP</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
