import { atom, useAtom } from "jotai";
import "../styles/globals.scss";
import SignIn from "../components/SignIn";

export const userAtom = atom({});

function MyApp({ Component, pageProps }) {
  const [user] = useAtom(userAtom);

  if (!user || !user.username) {
    return <SignIn />;
  }

  return <Component {...pageProps} />;
}

export default MyApp;
