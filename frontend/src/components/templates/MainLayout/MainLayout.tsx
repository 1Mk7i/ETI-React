// src/components/templates/MainLayout/MainLayout.tsx
import { NavLink, Outlet } from 'react-router-dom';
import styles from './MainLayout.module.css';

const MainLayout = () => {
  const getActiveClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <NavLink to="/" className={getActiveClass} end>Головна</NavLink>
          <NavLink to="/feed" className={getActiveClass}>Стрічка</NavLink>
          <NavLink to="/profile" className={getActiveClass}>Профіль</NavLink>
        </nav>
      </header>

      <main className={styles.mainContent}>
        <Outlet /> {/* Тут буде рендеритися поточна сторінка */}
      </main>

      <footer className={styles.footer}>
        © 2026 — Розроблено в рамках Лабораторної №4
      </footer>
    </div>
  );
};

export default MainLayout;