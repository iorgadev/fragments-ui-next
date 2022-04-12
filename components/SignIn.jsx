import { useState, useEffect } from "react";
import Head from "next/head";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import awsExports from "../aws/awsExports";

import { useAtom } from "jotai";
import { userAtom } from "../pages/_app";
import Loading from "./Loading";

import { CubeTransparentIcon } from "@heroicons/react/solid";

Amplify.configure({
  Auth: awsExports,
});

const CustomSignIn = () => {
  const [user, setUser] = useAtom(userAtom);
  const [loading, setLoading] = useState(false);
  const [activeInput, setActiveInput] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    code: "",
  });

  const handleInputChange = (e) => {
    const { value, dataset } = e.target;
    const { prop } = dataset;
    setFormData({
      ...formData,
      [prop]: value,
    });
  };

  const signInClick = async () => {
    try {
      setErrorMessage("");
      setLoading((prev) => true);
      const userResponse = await Auth.signIn(
        formData.username,
        formData.password
      );
      setLoading((prev) => false);
      if (userResponse) {
        document.cookie = `accessToken=${userResponse.signInUserSession.idToken.jwtToken};max-age=604800;`;
        setUser((prevUser) => (prevUser = userResponse));
      }
    } catch (error) {
      setLoading((prev) => false);
      setErrorMessage(error.message);
    }
  };

  const getUser = async () => {
    try {
      setLoading((prev) => true);
      const userResponse = await Auth.currentAuthenticatedUser();
      if (userResponse) {
        document.cookie = `accessToken=${userResponse.signInUserSession.idToken.jwtToken};max-age=604800;`;
        setUser((prevUser) => (prevUser = userResponse));
        return userResponse;
      }
      setLoading((prev) => false);
      setUser((prevUser) => (prevUser = null));
    } catch (error) {
      setLoading((prev) => false);
      return false;
    }
  };

  useEffect(() => {
    let accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let userResponse = getUser();
    setLoading((prev) => false);
    if (accessToken.length > 0 && userResponse) {
    } else {
      setUser(null);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="login">
      <Head>
        <title>Fragments Microservice</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form autoComplete="off">
        <div className="flex flex-col items-center justify-center">
          <img src="/images/logo.png" alt="logo" width="192" height="192" />
          <h1 className="text-4xl font-black text-teal-500 uppercase">
            Fragments
          </h1>
        </div>

        <div className="flex items-center justify-center pb-10 text-xs">
          <span className="text-xs text-neutral-400">
            Don&apos;t have an account?
          </span>
          <span
            onClick={() => Auth.federatedSignIn()}
            className="text-xs underline cursor-pointer text-neutral-200 underline-offset-2 hover:text-teal-200"
          >
            Register here.
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            data-prop={"username"}
            onChange={handleInputChange}
            type="text"
            autoComplete="off"
            onFocus={() => setActiveInput((prev) => "username")}
            onBlur={() => setActiveInput(null)}
          />
          <span
            className={`input-placeholder ${
              activeInput === `username` || formData.username.length > 0
                ? `active`
                : ``
            }`}
          >
            USERNAME
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            data-prop={"password"}
            onChange={handleInputChange}
            type="password"
            autoComplete="off"
            onFocus={() => setActiveInput((prev) => "password")}
            onBlur={() => setActiveInput(null)}
          />
          <span
            className={`input-placeholder ${
              activeInput === `password` || formData.password.length > 0
                ? `active`
                : ``
            }`}
          >
            PASSWORD
          </span>
        </div>

        <div>
          <button
            type="button"
            onClick={() => signInClick()}
            className="login-btn"
          >
            <CubeTransparentIcon className="w-7 h-7 relative top-0.5" />
            <span>Login</span>
          </button>
        </div>

        <div className="h-8 text-center text-red-600">
          <span>{errorMessage.length > 0 ? errorMessage : ""}</span>
        </div>
      </form>
    </div>
  );
};

export default CustomSignIn;
