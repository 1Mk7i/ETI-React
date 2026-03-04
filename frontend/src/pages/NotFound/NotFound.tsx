import { Link } from 'react-router-dom';

const notFoundStyles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '500px',
    textAlign: 'center',
    padding: '2rem'
  },
  title: {
    fontSize: '5rem',
    color: '#dc3545',
    margin: 0,
    lineHeight: 1,
    fontWeight: 700
  },
  link: {
    display: 'inline-block',
    marginTop: '2rem',
    padding: '0.75rem 2rem',
    backgroundColor: '#0066cc',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    transition: 'all 0.2s ease'
  }
};

const NotFound = () => {
  return (
    <div style={notFoundStyles.container}>
      <h1 style={notFoundStyles.title}>404</h1>
      <h2>Сторінка не знайдена</h2>
      <p>На жаль, сторінка, яку ви шукаєте, не існує.</p>
      <Link to="/" style={notFoundStyles.link}>
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFound;
