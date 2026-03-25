import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './components/templates/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import PostPage from './pages/PostPage/PostPage';
import Profile from './pages/Profile/Profile';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound/NotFound';
import ProtectedRoute from './components/hoc/ProtectedRoute';
import useOnlineStatus from './hooks/useOnlineStatus'; // Імпорт хука ПР8

const App: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      {/* Індикатор мережі (ПР №8) */}
      {!isOnline && (
        <div style={{
          backgroundColor: '#ff4d4f',
          color: 'white',
          textAlign: 'center',
          padding: '10px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9999,
          fontWeight: 'bold',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}>
          ⚠️ Відсутнє підключення до Інтернету. Деякі функції можуть бути недоступні.
        </div>
      )}

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="feed" element={<Feed />} />
          {/* Динамічний параметр :postId (ПР №7) */}
          <Route path="feed/:postId" element={<PostPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="profile/*" element={<Profile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;