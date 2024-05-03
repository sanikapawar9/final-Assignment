import { Link } from "react-router-dom";
import PageContent from "../components/HomePageContent";
import useAuth from "../contexts/AuthContext";

const HomePage=()=> {
  const { isLoggedIn } = useAuth();

  return (
    <PageContent title="Welcome!">
      {isLoggedIn ? (
        <Link to="/auth">Logout here</Link>
      ) : (
        <div>
          <p>Browse to get all the Todos</p>
          <Link to="/auth">Login or Signup here</Link>
        </div>
      )}
    </PageContent>
  );
}

export default HomePage;
