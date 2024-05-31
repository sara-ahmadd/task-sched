import { ChangeEvent, useState } from "react";
import InputField from "../shared/InputField";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { UserType } from "../types";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Btn from "../shared/Btn";
import { toast } from "react-toastify";
import { useCheckAuth } from "../hooks/useCheckAuth";

function Register() {
  const methods = useForm<UserType>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const userData = useAppSelector((state) => state.userReducer.user);
  const onSubmit: SubmitHandler<UserType> = async (data) => {
    try {
      if (data && data.email && data.password) {
        const register = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        );
        console.log(register.user);
        toast.success("User created successfully");
      }
    } catch (error) {
      toast.error(`${error}`);
      console.error("Error signing up:", error);
    }

    navigate("/login");
  };

  useCheckAuth();

  if (userData?.email) {
    return <Navigate to="/tasks" state={{ path: location.pathname }} />;
  } else {
    return (
      <div className=" page-dimensions">
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col justify-start items-center gap-3 p-5 my-3 w-[90%] md:w-1/2 bg-white mx-auto  text-text"
        >
          <h3 className="text-center font-medium text-xl">Register now</h3>
          <FormProvider {...methods}>
            {/* first & last names */}
            <InputField
              label={"First Name"}
              id={"firstName"}
              placeholder={"Enter your first name"}
              type={"text"}
              register={methods.register("firstName", {
                required: "First name is required.",
              })}
            />
            <InputField
              label={"Last Name"}
              id={"lastName"}
              placeholder={"Enter your last name"}
              type={"text"}
              register={methods.register("lastName")}
            />

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
            <div className="relative w-fit min-h-[100px]">
              <InputField
                label={"Confirm Password"}
                id={"confirmPassword"}
                placeholder={"Enter confirm password"}
                type={showConfirmPassword ? "text" : "password"}
                register={methods.register("confirmPassword", {
                  required: "Confirm Password is required.",
                  onChange: (e: ChangeEvent<HTMLInputElement>) => {
                    if (e.target.value !== methods.watch("password")) {
                      methods.setError("confirmPassword", {
                        message: "Passwords don't match",
                      });
                    } else {
                      methods.clearErrors("confirmPassword");
                    }
                  },
                })}
              />
              <span
                role="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-[40%] right-3"
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </span>
            </div>
          </FormProvider>
          <Btn>Submit</Btn>
          <div className="text-center capitalize">
            <p>
              already a member?{" "}
              <Link to={"/login"} className="underline">
                Login to your account
              </Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
