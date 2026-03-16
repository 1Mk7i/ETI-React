import React, { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

interface User {
  id?: number;
  email: string;
  name?: string;
  username?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean; // Додаємо для UX (блокування кнопки входу)
  login: (email: string) => Promise<void>; // Тепер повертає Promise
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Крок 4: Імітація мережевої затримки
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Запит до JSONPlaceholder для отримання фіктивних даних профілю
      const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
      if (!response.ok) throw new Error("Помилка при отриманні профілю");
      
      const userData = await response.json();

      setIsAuthenticated(true);
      // Об'єднуємо введену пошту з даними з API
      setUser({
        id: userData.id,
        email: email,
        name: userData.name,
        username: userData.username
      });
    } catch (error) {
      console.error("Помилка авторизації:", error);
      alert("Не вдалося увійти. Спробуйте ще раз.");
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
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};