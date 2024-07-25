import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Login() {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (firebase.isLoggedIn) {
      navigate("/");
    }
  }, [firebase, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Logging In...");
    try {
      const result = await firebase.signinUserWithEmailAndPassword(
        email,
        password
      );
      console.log("Login Successful...", result);
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error.code, error.message);
    }
  };

  return (
    <section>
      <div className="grid grid-cols-1 lg:grid-cols-2  p-4">
        <div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
          <div className="absolute inset-0">
            <img
              className="h-full w-full rounded-md object-cover object-top"
              src="https://images.unsplash.com/photo-1534120247760-c44c3e4a62f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTk0fHxkZXNpZ25lcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60"
              alt=""
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
          <div className="relative">
            <div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
              <h3 className="text-4xl font-bold text-white">
                Now you don't have to rely on your designer to create a new page
              </h3>
              <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Commercial License{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Unlimited Exports{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    120+ Coded Blocks{" "}
                  </span>
                </li>
                <li className="flex items-center space-x-3">
                  <div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                    <svg
                      className="h-3.5 w-3.5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <span className="text-lg font-medium text-white">
                    {" "}
                    Design Files Included{" "}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
              Sign in
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-black transition-all duration-200 hover:underline"
              >
                Create a free account
              </Link>
            </p>
            <form onSubmit={handleSubmit} className="mt-8">
              <div className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="text-base font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="text-base font-medium text-gray-900"
                    >
                      Password
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-semibold text-black hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white"
                  >
                    Get started <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </form>
            <div className="mt-3 space-y-3">
              <button
                onClick={firebase.signinWithGoogle}
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border-2 border-gray-900 bg-white px-3.5 py-2.5 font-semibold text-gray-900 transition-all duration-200 focus:bg-gray-100 focus:outline-none"
              >
                <svg
                  className="mr-2.5 h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="800px"
                  height="800px"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.13 0 5.9 1.16 8.09 3.06l6.22-6.22C34.52 3.54 29.58 1.5 24 1.5 14.78 1.5 6.88 7.56 3.86 16.32l7.51 5.81C13.4 16.47 18.26 12.5 24 12.5"
                  />
                  <path
                    fill="#34A853"
                    d="M46.61 24.93c.34-1.08.53-2.22.53-3.43 0-1.2-.19-2.35-.5-3.44H24v7.09h12.68c-.55 2.6-2.13 4.81-4.39 6.27l6.82 5.27c3.92-3.63 6.5-8.97 6.5-15.2 0-.55-.03-1.09-.09-1.63z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M10.79 27.28c-1.27-2.55-1.27-5.51 0-8.06l-7.51-5.81c-3.21 6.37-3.21 14.3 0 20.68l7.51-5.81z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 46.5c5.58 0 10.52-2.04 14.31-5.41l-6.82-5.27c-2 1.29-4.51 2.04-7.49 2.04-5.74 0-10.6-3.97-12.31-9.47l-7.51 5.81C6.88 40.44 14.78 46.5 24 46.5z"
                  />
                </svg>
                Sign in with Google
              </button>
              <button
                type="button"
                className="relative inline-flex w-full items-center justify-center rounded-md border-2 border-gray-900 bg-white px-3.5 py-2.5 font-semibold text-gray-900 transition-all duration-200 focus:bg-gray-100 focus:outline-none"
              >
                <svg
                  className="mr-2.5 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 32"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#1877F2"
                      d="M29 16c0-7.2-5.8-13-13-13S3 8.8 3 16c0 6.5 4.8 11.9 11 12.9v-9.1H9.2V16H14v-2.7c0-4.7 2.8-7.3 7.1-7.3 2 0 4.1.4 4.1.4v4.5h-2.3c-2.3 0-3 1.4-3 2.9V16h5.1l-.8 3.8h-4.3v9.1c6.2-1 11-6.4 11-12.9z"
                    ></path>
                    <path
                      fill="#FAFBFC"
                      d="M20.8 19.8 21.6 16h-5.1v-2.1c0-1.5.8-2.9 3-2.9H21V6.5s-2.1-.4-4.1-.4c-4.2 0-7.1 2.6-7.1 7.3V16H9.2v3.8H14v9.1c.9.1 1.8.2 2.7.2s1.8-.1 2.7-.2v-9.1h1.4z"
                    ></path>
                  </g>
                </svg>
                Sign in with Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
