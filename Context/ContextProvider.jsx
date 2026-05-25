import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  useEffect(() => {
    const verifyUser = async (req, res) => {
      try {
        const res = await axios.get(
          "https://march-01-project.onrender.com/api/note/verify",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        if (res.data.success) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch {
        console.log("errro in verification");
      }
    };
    verifyUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default ContextProvider;
