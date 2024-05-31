import { useState } from "react";
import InputField from "../shared/InputField";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppSelector } from "../redux/store";
import { Navigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { UserType } from "../types";
import { Link } from "react-router-dom";
import Btn from "../shared/Btn";
import { toast } from "react-toastify";
import { useCheckAuth } from "../hooks/useCheckAuth";

function Login() {
  const methods = useForm<UserType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const userData = useAppSelector((state) => state.userReducer.user);
  const onSubmit: SubmitHandler<UserType> = async (data) => {
    try {
      if (data && data.email && data.password) {
        await signInWithEmailAndPassword(auth, data?.email, data?.password);
        toast.success("Logged in successfully");
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("Error==>", error);
    }
  };

  useCheckAuth();

  if (userData?.email) {
    return <Navigate to="/tasks" state={{ path: location.pathname }} />;
  } else {
    return (
      <div className=" page-dimensions">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center gap-3 p-5 my-3 w-[90%] md:w-1/2 bg-white mx-auto text-text"
        >
          <h3 className="text-center font-medium text-xl">
            Login to your account
          </h3>
          <FormProvider {...methods}>
            <InputField
              label={"Email"}
              id={"email"}
              placeholder={"Enter your email"}
              type={"email"}
              register={methods.register("email", {
                required: "Email is required.",
              })}
            />
            <div className="relative w-fit min-h-[100px]">
              <InputField
                label={"Password"}
                id={"password"}
                placeholder={"Enter your password"}
                type={showPassword ? "text" : "password"}
                register={methods.register("password", {
                  required: "Password is required.",
                })}
              />
              <span
                role="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-[40%] right-3"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </FormProvider>
          <Btn>Submit</Btn>
          <div className="text-center capitalize">
            <p>
              Not a member?{" "}
              <Link to={"/register"} className="underline">
                register now
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
