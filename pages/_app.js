import { useEffect, useState } from "react";
import { atom, useAtom } from "jotai";
import "../styles/globals.scss";
import SignIn from "../components/SignIn";

export const userAtom = atom({});
export const userFragmentsAtom = atom([]);

function MyApp({ Component, pageProps }) {
  const [user] = useAtom(userAtom);

  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (user && user?.username) {
      setLoggedIn((prev) => true);
    } else {
      setLoggedIn((prev) => false);
    }
  }, [user]);

  if (!user || user === {} || !loggedIn) {
    return <SignIn />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
