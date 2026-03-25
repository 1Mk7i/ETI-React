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
import useOnlineStatus from './hooks/useOnlineStatus';

const App: React.FC = () => {
  const isOnline = useOnlineStatus();

  return (
    <>
      {!isOnline && (
        <div style={{
          backgroundColor: '#ff4d4f',
          color: 'white',
          textAlign: 'center',
          padding: '8px',
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          zIndex: 9999
        }}>
          ⚠️ Ви зараз офлайн. Перевірте з'єднання з мережею.
        </div>
      )}

      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="feed" element={<Feed />} />
          <Route path="feed/:postId" element={<PostPage />} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="profile/*" element={<Profile />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </> // <--- І закриваємо його тут
  );
};

export default App;