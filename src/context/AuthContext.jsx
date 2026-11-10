import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const AUTH_STORAGE_KEY = "masalaplm-demo-session";

const DEMO_USER = {
  email: "admin@masalaplm.com",
  password: "Admin@123",
  name: "Admin User",
  role: "Administrator",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedSession = localStorage.getItem(AUTH_STORAGE_KEY);
      return savedSession ? JSON.parse(savedSession) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    if (
      normalizedEmail !== DEMO_USER.email ||
      password !== DEMO_USER.password
    ) {
      return {
        success: false,
        message: "Invalid email address or password.",
      };
    }

    const authenticatedUser = {
      email: DEMO_USER.email,
      name: DEMO_USER.name,
      role: DEMO_USER.role,
    };

    localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(authenticatedUser)
    );

    setUser(authenticatedUser);

    return {
      success: true,
      message: "Login successful.",
    };
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
