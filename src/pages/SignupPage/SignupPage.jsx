import { useNavigate } from "react-router-dom";
import "../SignupPage/SignupPage.scss";
import { useState } from "react";
import axios from "axios";

export default function SignupPage() {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.name) {
      setErrorMessage("You must fill in all the form fields");
      return;
    }

    if (!emailRegex.test(formData.email)) {
      setErrorMessage(
        "The email address is not valid. Expected format: x@x.xx"
      );
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setErrorMessage("");
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  return (
    <main className="signup">
      <div className="form__wrapper">
        <h2>Sign Up</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form__input"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="emailRegister">Email</label>
            <input
              type="text"
              name="email"
              id="emailRegister"
              className="form__input"
              onChange={(e) => handleChange(e)}
            />
          </div>
          {errorMessage && <p>{errorMessage}</p>}
          <div className="form__group">
            <label htmlFor="passwordRegister">Password</label>
            <input
              type="password"
              name="password"
              id="passwordRegister"
              className="form__input"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button className="form__button">Signup</button>
          {success && <p>You're signed up! Redirecting to login page...</p>}
        </form>
      </div>
    </main>
  );
}
