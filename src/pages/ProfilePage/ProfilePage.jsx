import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { BounceLoader } from "react-spinners";

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const [accountDeleted, setAccountDeleted] = useState(false);

  const getUserData = async () => {
    const authToken = localStorage.getItem("authToken");

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/users/profile`,
        {
          headers: {
            authorisation: `Bearer ${authToken}`,
          },
        }
      );
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      if (error.status === 401) {
        setError("You must be logged in to view this page");
        setIsLoading(false);
      }
    }
  };

  const deleteUser = async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/users/:id`, {
        headers: {
          authorisation: `Bearer ${authToken}`,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  const handleDelete = () => {
    deleteUser();
    localStorage.removeItem("authToken");
    setAccountDeleted(true);
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <main>
      {isLoading && <BounceLoader />}
      {!isLoading && !error && (
        <section className="profile__wrapper">
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout} className="profile__button">
            Logout
          </button>
          <button className="profile__button" onClick={handleDelete}>
            Delete Account
          </button>
          {accountDeleted && (
            <p>Your account has been deleted, redirecting to homepage</p>
          )}
        </section>
      )}
      {error && <p className="error">{error}</p>}
    </main>
  );
}
