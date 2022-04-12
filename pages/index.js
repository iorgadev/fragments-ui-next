import Head from "next/head";
import { useAtom } from "jotai";
import { userAtom } from "./_app";
import Loading from "@/components/Loading";
import Fragments from "@/components/Fragments";
import { Auth } from "aws-amplify";

const Home = () => {
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = async () => {
    await Auth.signOut();
    setUser((prevUser) => null);
    document.cookie = "";
  };

  if (!user && !user.username) {
    return <Loading />;
  }

  return (
    <>
      <div className="main">
        <Head>
          <title>Fragments Microservice</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Fragments handleLogout={handleLogout} />
      </div>
    </>
  );
};

export default Home;
