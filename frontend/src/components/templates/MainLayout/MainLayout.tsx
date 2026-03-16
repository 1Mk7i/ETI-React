import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import Button from '../../atoms/Button/Button';

const MainLayout = () => {
  const { isAuthenticated, logout } = useAuth();

  const linkBase: React.CSSProperties = {
    textDecoration: 'none',
    color: '#666',
    fontWeight: 500,
    fontSize: '1rem',
    padding: '1rem 1.5rem',
    display: 'flex',
    alignItems: 'center',
    height: '100%'
  };

  const activeLink: React.CSSProperties = {
    ...linkBase,
    color: '#0066cc',
    borderBottom: '3px solid #0066cc'
  };

  const getLinkStyle = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeLink : linkBase;

  const styles: { [key: string]: React.CSSProperties } = {
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: '#ffffff'
    },
    header: {
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
    },
    navbar: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: '70px',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
      width: '100%'
    },
    mainContent: {
      flex: 1,
      width: '100%',
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem 2rem',
      boxSizing: 'border-box'
    },
    footer: {
      backgroundColor: '#f5f5f5',
      color: '#666666',
      textAlign: 'center',
      padding: '2rem',
      fontSize: '0.95rem',
      borderTop: '1px solid #e0e0e0',
      marginTop: 'auto'
    },
    authSection: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    }
  }; 

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <nav style={styles.navbar}>
          <NavLink to="/" style={getLinkStyle} end>
            Головна
          </NavLink>
          <NavLink to="/feed" style={getLinkStyle}>
            Стрічка
          </NavLink>
          
          {isAuthenticated && (
            <NavLink to="/profile" style={getLinkStyle}>
              Профіль
            </NavLink>
          )}

          <div style={styles.authSection}>
            {isAuthenticated ? (
              <Button onClick={logout} variant="secondary">
                Вийти
              </Button>
            ) : (
              <NavLink to="/login" style={getLinkStyle}>
                Увійти
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      <main style={styles.mainContent}>
        <Outlet />
      </main>

      <footer style={styles.footer}>
        © 2026 — Розроблено в рамках Лабораторної №5
      </footer>
    </div>
  );
};

export default MainLayout;