import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../LoginPage/LoginPage.scss";
import { useState } from "react";

export default function LoginPage() {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      setErrorMessage("You must provide a username and a password");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        "The email address is not valid. Expected format: x@x.xx"
      );
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/users/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem("authToken", data.authToken);

      setSuccess(true);
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      setErrorMessage("No user with these credentials exists");
    }
  };

  return (
    <main>
      <h2>Login</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form__group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="form__group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button>Login</button>
        {errorMessage && <p>{errorMessage}</p>}
        {success && <p>Success! Redirecting to profile page...</p>}
      </form>
    </main>
  );
}
