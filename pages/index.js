import { useEffect } from "react";
import { useAtom } from "jotai";
import { userAtom } from "./_app";
import Loading from "../components/Loading";

const Home = () => {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    console.log("Home.js - User: ", user);
  }, []);

  if (!user || !user.username) {
    return <Loading />;
  }

  return (
    <div>
      Hello, {user.username}
      <div>
        <button className="bg-red-500">Logout</button>
      </div>
    </div>
  );
};

export default Home;
