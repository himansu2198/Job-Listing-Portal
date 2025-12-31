import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // attach token
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }, [token]);

  useEffect(() => {
    setLoading(false);
  }, []);

  // ✅ REAL LOGIN
  const login = async (email, password) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/login",
      { email, password }
    );

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/jobseeker/dashboard");
    }
  };

  // ✅ REAL REGISTER
  const register = async (formData) => {
    const { data } = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );

    setToken(data.token);
    setUser(data.user);

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (data.user.role === "employer") {
      navigate("/employer/dashboard");
    } else {
      navigate("/jobseeker/dashboard");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        loading,
        isAuthenticated: !!token,
        isEmployer: user?.role === "employer",
        isJobSeeker: user?.role === "jobseeker",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


