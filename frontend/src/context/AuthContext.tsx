import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface User {
  id?: number;
  email: string;
  name?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Симуляція затримки для дебагу та UX
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      const userData = await response.json();

      setIsAuthenticated(true);
      setUser({ email, name: userData.name, id: userData.id });
    } catch (error) {
      console.error("Auth error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};