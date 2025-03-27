import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && !error && (
        <section>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout}>Logout</button>
          <button onClick={handleDelete}>Delete Account</button>
          {accountDeleted && (
            <p>Your account has been deleted, redirecting to homepage</p>
          )}
        </section>
      )}
      {error && <p>{error}</p>}
    </main>
  );
}
