"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const value = {
    loading,
    setLoading,
    email,
    setEmail,
    password,
    setPassword,
    token,
    setToken,
    user,
    setUser,
  };
  const getUser = async (localToken) => {
    try {
      const rawData = await fetch("http://localhost:8000/users/me", {
        method: "GET",
        headers: {
          authorization: localToken,
        },
      });
      const data = await rawData.json();
      setUser(data.user);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        getUser(localToken);
        return setToken(localToken);
      }
      return setToken("no token");
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
