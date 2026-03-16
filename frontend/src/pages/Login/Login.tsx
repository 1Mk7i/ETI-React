import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      await login(email);
      navigate('/profile');
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '100px auto', textAlign: 'center' }}>
      <h2>Вхід до системи</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Введіть email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          required
        />
        <button 
          type="submit" 
          disabled={isLoading}
          style={{ 
            width: '100%', 
            padding: '10px', 
            backgroundColor: isLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            cursor: isLoading ? 'not-allowed' : 'pointer'
          }}
        >
          {isLoading ? 'Завантаження...' : 'Увійти'}
        </button>
      </form>
    </div>
  );
};

export default Login;