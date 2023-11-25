import "./DashboardPage.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

let Dashboard = () => {
  const [failedAuth, setFailedAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  const login = async () => {
    const apiBody = process.env.REACT_APP_BASE_URL;
    const token = sessionStorage.getItem("token");

    try {
      const response = await axios.get(`${apiBody}/profile`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setData(response.data);
      console.log(response);
    } catch (error) {
      setFailedAuth(true);
      console.log(error.message);
    }
    setIsLoading(false);
  };

  //copy paste to all pages that require authentication
  useEffect(() => {
    login();
  }, []);

  if (failedAuth) {
    return (
      <main className="main">
        <h2 className="dashboard__header--fail">
          You must log in to see this page
        </h2>
        <button className="button" onClick={handleLogin}>
          Log in
        </button>
        {/* <Link to="/login" className="signup-text_link">
          Log in
        </Link> */}
      </main>
    );
  }

  if (isLoading) {
    return <main>Loading...</main>;
  }

  return (
    <main className="main">
      {failedAuth && <div>You must log in to see this page.</div>}

      <h3 className="dashboard__header">Hello, {data.name}</h3>

      <h2 className="dashboard__body">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </h2>
      <button
        onClick={() => navigate("/categories")}
        className="button button--dashboard"
      >
        Get started
      </button>
    </main>
  );
};

export default Dashboard;
