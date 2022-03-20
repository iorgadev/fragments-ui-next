import { useAtom } from "jotai";
import { userAtom } from "./_app";
import Loading from "../components/Loading";
import Fragments from "../components/User/Fragments";
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
      {/* <div className="main__left"> */}
      <Fragments />
      {/* <div className="flex-grow"><span>fragment data</span></div> */}
      {/* </div> */}
      {/* <div className="main__right">
        <button className="bg-red-500" onClick={handleLogout}>
          Logout
        </button>
      </div> */}
    </div>
  );
};

export default Home;
