import "./LoginPage.scss";
import axios from "axios";
import { useState } from "react";
import Input from "../../components/Input/Input";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiBody = process.env.REACT_APP_BASE_URL;

    try {
      const response = await axios.post(`${apiBody}/auth/login`, {
        email: event.target.email.value,
        password: event.target.password.value,
      });

      sessionStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      navigate(`/?userId=${response.data.userId}`);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <main className="main">
      <section className="auth-container">
        <h2 className="login-title">Log in</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <Input type="text" name="email" label="Email" />
          <Input type="password" name="password" label="Password" />
          <button className="button button-login">Log in</button>
          {error && (
            <div className="error">
              <p>{error}</p>
            </div>
          )}
        </form>
        <p className="signup-text">
          Need an account?{" "}
          <Link to="/signup" className="signup-text_link">
            Sign up
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Login;
