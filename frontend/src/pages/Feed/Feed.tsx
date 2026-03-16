import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import PostCard from '../../components/molecules/Post/Post';
import ProductCard from '../../components/Product/ProductCard';
import { useFetch } from '../../hooks/useFetch'; // Наш новий хук

// Тип для даних з JSONPlaceholder
interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const MOCK_PRODUCTS = [
  {
    id: 101,
    title: "Механічна клавіатура",
    description: "RGB підсвітка, перемикачі Blue Switch, алюмінієвий корпус.",
    price: 2500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=500"
  },
  {
    id: 102,
    title: "Ігрова миша",
    description: "16000 DPI, бездротова, ергономічний дизайн для правші.",
    price: 1800,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500"
  }
];

const feedStyles: { [key: string]: React.CSSProperties } = {
  sectionTitle: {
    margin: '2rem 0 1.5rem 0',
    fontSize: '1.5rem',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '0.5rem'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  productsGrid: {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
    gap: '20px',
    marginBottom: '3rem'
  },
  statusMessage: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '1.2rem',
    color: '#666'
  }
};

const Feed: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Використовуємо API замість статичних даних
  const { data: posts, isLoading, error } = useFetch<ApiPost[]>("https://jsonplaceholder.typicode.com/posts");

  // Фільтрація отриманих даних
  const filteredPosts = posts ? posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10) : []; // Беремо лише перші 10 постів

  return (
    <section>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {/* Секція товарів (залишається як була в Практ №5) */}
      {!searchTerm && (
        <>
          <h2 style={feedStyles.sectionTitle}>Рекомендовані товари</h2>
          <div style={feedStyles.productsGrid}>
            {MOCK_PRODUCTS.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </>
      )}

      <h2 style={feedStyles.sectionTitle}>Стрічка новин (Live API)</h2>

      {/* Реалізація тріади станів */}
      {isLoading && <div style={feedStyles.statusMessage}>⏳ Завантаження публікацій...</div>}
      
      {error && <div style={{...feedStyles.statusMessage, color: 'red'}}>❌ Помилка: {error}</div>}

      {!isLoading && !error && (
        <div style={feedStyles.container}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <div key={post.id} style={{ 
                position: 'relative', 
                padding: '15px', 
                border: '1px solid #eee', 
                borderRadius: '8px' 
              }}>
                <PostCard 
                  id={post.id}
                  category="News"         
                  author={`Користувач #${post.userId}`}
                  content={post.body}
                  date="Сьогодні" 
                  avatar={`https://i.pravatar.cc/150?u=${post.userId}`} 
                  likes={Math.floor(Math.random() * 50)} 
                />
                <Link 
                  to={`/feed/${post.id}`}
                  style={{
                    display: 'inline-block',
                    marginTop: '10px',
                    color: '#0066cc',
                    textDecoration: 'none',
                    fontWeight: 'bold'
                  }}
                >
                  Читати далі →
                </Link>
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', color: '#999' }}>Новин не знайдено.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Feed;