import { useState, useEffect } from "react";
import { Amplify } from "@aws-amplify/core";
import { Auth } from "@aws-amplify/auth";
import awsExports from "../aws/awsExports";

import { useAtom } from "jotai";
import { userAtom } from "../pages/_app";

Amplify.configure({
  Auth: awsExports,
});

const CustomSignIn = () => {
  const [user, setUser] = useAtom(userAtom);

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
      const userResponse = await Auth.signIn(
        formData.username,
        formData.password
      );
      if (userResponse) {
        document.cookie = `accessToken=${userResponse.signInUserSession.idToken.jwtToken};max-age=604800;`;
        setUser((prevUser) => (prevUser = userResponse));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getUser = async () => {
    try {
      const userResponse = await Auth.currentAuthenticatedUser();
      if (userResponse) {
        document.cookie = `accessToken=${userResponse.signInUserSession.idToken.jwtToken};max-age=604800;`;
        setUser((prevUser) => (prevUser = userResponse));
        return userResponse;
      }
      setUser((prevUser) => (prevUser = null));
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  useEffect(() => {
    let accessToken = document.cookie.replace(
      /(?:(?:^|.*;\s*)accessToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    // console.log("accessToken: ", accessToken);
    let userResponse = getUser();
    if (accessToken.length > 0 && userResponse) {
      console.log("getUser(): ", user);
    } else {
      console.log("User needs to login.");
      setUser({});
    }
  }, []);

  return (
    <div>
      <form>
        <div>
          <label htmlFor="username"> Username</label>
          <input
            data-prop={"username"}
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            data-prop={"password"}
            onChange={handleInputChange}
            type="password"
            placeholder="******************"
          />
        </div>
        <div>
          <button type="button" onClick={() => signInClick()}>
            Login
          </button>
          <p>
            <a onClick={() => Auth.federatedSignIn()}> Create account</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default CustomSignIn;
