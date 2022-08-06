import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateUser } from "../services/authService";
import useGlobalState from "../store/store";
import { useNavigate } from "react-router";

export default function Signup() {
  const state = useGlobalState();
  const getState = state.getUser;
  const isLoggedIn = state.getLoggedIn;
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  if (getState?.user?.isSignupComplete) {
    navigate("/dashboard");
  }

  useEffect(() => {
    // necessary because it's null even after first fetch
    reset({
      "Full name": getState?.user?.name,
      Email: getState?.user?.email,
    });
  }, [isLoggedIn]);

  const onSubmit = async userData => {
    const { data } = await updateUser({
      id: getState?.user?.id,
      name: userData["Full name"],
      email: userData["Email"],
      password: userData["Password"],
    });
    if (data) {
      state.updateUser(data);
    }
    navigate("/dashboard");
  };

  return (
    <section className="h-screen">
      <div className="container px-6 py-12 shadow-lg">
        <p className="pb-6 text-center">Please complete your signup.</p>
        <div className="flex justify-center items-center flex-wrap g-6 text-gray-800">
          <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="w-full"
              alt="Phone"
            />
          </div>
          <div className="md:w-8/12 lg:w-5/12 lg:ml-20 mt-5 mt-lg-0">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Full name */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Full Name"
                  {...register("Full name", { required: true, maxLength: 80 })}
                />
                <small className="text-red-600">
                  {errors[`Full name`]?.type === "required" &&
                    "Full name is required"}
                </small>
              </div>
              {/* Email input */}
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Email address"
                  {...register("Email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                />
                <small className="text-red-600">
                  {errors[`Email`]?.type === "required" && "Email is required"}
                  {errors[`Email`]?.type === "pattern" &&
                    "Email format is incorrect."}
                </small>
              </div>
              {/* Password input */}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Password"
                  {...register("Password", { required: true, min: 8 })}
                />
                <small className="text-red-600">
                  {errors[`Password`]?.type === "required" &&
                    "Password is required. "}
                  {errors[`Password`]?.type === "min" &&
                    "Password min length is 8"}
                </small>
              </div>
              {/* Confirm Password input */}
              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  placeholder="Confirm Password"
                  {...register("Confirm password", {
                    required: true,
                    min: 8,
                    validate: val => {
                      if (watch("Password") !== val) {
                        return "Confirm password must match password.";
                      }
                    },
                  })}
                />
                <small className="text-red-600">
                  {errors[`Confirm password`]?.type === "required" &&
                    "Confirm password is required"}
                  {errors[`Confirm password`]?.type === "validate" &&
                    "Confirm password do not match."}
                  {errors[`Confirm password`]?.type === "min" &&
                    "Password min length is 8"}
                </small>
              </div>
              {/* Submit button */}
              <button
                type="submit"
                className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
              >
                Complete sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
