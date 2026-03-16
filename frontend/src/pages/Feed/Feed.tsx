import { useState, type FC } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import PostCard from '../../components/molecules/Post/Post';
import ProductCard from '../../components/Product/ProductCard';
import { useFetch } from '../../hooks/useFetch';

interface ApiPost {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const MOCK_PRODUCTS = [
  { id: 101, title: "Механічна клавіатура", description: "RGB підсвітка", price: 2500, rating: 4.8, image: "https://via.placeholder.com/150" },
  { id: 102, title: "Ігрова миша", description: "16000 DPI", price: 1800, rating: 4.5, image: "https://via.placeholder.com/150" }
];

const Feed: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { data: posts, isLoading, error } = useFetch<ApiPost[]>("https://jsonplaceholder.typicode.com/posts");

  const filteredPosts = posts ? posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10) : [];

  return (
    <div style={{ padding: '20px' }}>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {!searchTerm && (
        <>
          <h2>Рекомендовані товари</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
            {MOCK_PRODUCTS.map(product => <ProductCard key={product.id} {...product} />)}
          </div>
        </>
      )}

      <h2>Стрічка новин (API)</h2>

      {isLoading && <p>⏳ Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <PostCard 
              id={post.id}
              category="News"
              author={`User #${post.userId}`}
              content={post.body}
              date="Сьогодні" 
              avatar={`https://i.pravatar.cc/150?u=${post.userId}`} 
              likes={Math.floor(Math.random() * 50)} 
            />
            <Link to={`/feed/${post.id}`} style={{ fontWeight: 'bold', color: '#0066cc', textDecoration: 'none' }}>
              Читати далі →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;