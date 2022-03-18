import { useState } from "react";
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
        setUser((prevUser) => (prevUser = userResponse));
      }
    } catch (error) {
      console.log(error.message);
    }
  };
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
