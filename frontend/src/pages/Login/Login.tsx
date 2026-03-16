import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/atoms/Button/Button";
import Input from "../../components/atoms/Input/Input"; 

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      login({ email });
      navigate("/profile", { replace: true });
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2>Вхід в систему</h2>
        <Input 
          type="email" 
          placeholder="vash@email.com" 
          label="Ваш Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="primary" className="w-full">
          Увійти
        </Button>
      </form>
    </div>
  );
};

export default Login;