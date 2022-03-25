import { useAtom } from "jotai";
import { userAtom } from "./_app";
import Loading from "@/components/Loading";
import Fragments from "@/components/Fragments";
import { Auth } from "aws-amplify";

const Home = () => {
  const [user, setUser] = useAtom(userAtom);

  if (!user || !user.username) {
    return <Loading />;
  }

  const handleLogout = () => {
    Auth.signOut();
    document.cookie = "accessToken=;";
    setUser((prevUser) => (prevUser = {}));
  };

  return (
    <div className="main">
      <Fragments />
    </div>
  );
};

export default Home;
