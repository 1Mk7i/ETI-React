import { type FC, useState, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import PostCard from '../../components/molecules/Post/Post';
import ProductCard from '../../components/Product/ProductCard';
import { useFetch } from '../../hooks/useFetch';
import useWindowSize from '../../hooks/useWindowSize';

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

// Штучна "важка" функція
const calculateHeavyAnalytics = (num: number): number => {
  console.log("%c [Process] Важкі обчислення...", "color: #ff9800");
  let result = 0;
  for (let i = 0; i < 500000000; i++) { result += num; } // Імітація затримки
  return result;
};

const Feed: FC = () => {
  const { width } = useWindowSize();
  const isMobile = width < 768;

  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('query') || '';
  
  // Стейт для "важкої" аналітики
  const [analyticsBase, setAnalyticsBase] = useState(1);

  // ОПТИМІЗАЦІЯ 1: useMemo для важких розрахунків
  // Тепер при введенні тексту в SearchBar ця функція НЕ буде запускатися
  const heavyResult = useMemo(() => {
    return calculateHeavyAnalytics(analyticsBase);
  }, [analyticsBase]);

  const { data: posts, isLoading, error } = useFetch<ApiPost[]>("https://jsonplaceholder.typicode.com/posts");

  const handleSearchChange = (value: string) => {
    if (value) setSearchParams({ query: value });
    else setSearchParams({});
  };

  // ОПТИМІЗАЦІЯ 2: useCallback для стабілізації посилання на функцію
  // Це потрібно, щоб React.memo у PostCard спрацював коректно
  const handleLike = useCallback((id: number) => {
    console.log(`Пост #${id} лайкнуто!`);
  }, []); // Залежностей немає, посилання буде вічним

  const filteredPosts = posts ? posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  ).slice(0, 10) : [];

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #ddd' }}>
        <h4>Аналітичний звіт: {heavyResult}</h4>
        <button onClick={() => setAnalyticsBase(p => p + 1)}>Оновити дані звіту</button>
        <p><small>(Пошук працює швидко, бо звіт не перераховується дарма)</small></p>
      </div>

      <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />

      {!searchTerm && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {MOCK_PRODUCTS.map(product => <ProductCard key={product.id} {...product} />)}
        </div>
      )}

      <h2>Стрічка новин</h2>

      {isLoading && <p>⏳ Завантаження...</p>}
      {error && <p style={{ color: 'red' }}>Помилка: {error}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
        {filteredPosts.map(post => (
          <div key={post.id} style={{ border: '1px solid #eee', padding: '10px', borderRadius: '8px' }}>
            <PostCard 
              id={post.id}
              category="News"
              author={`User #${post.userId}`}
              content={post.body}
              avatar={`https://i.pravatar.cc/150?u=${post.userId}`} 
              likes={Math.floor(Math.random() * 100)}
              onLike={handleLike}
            />
            <Link to={`/feed/${post.id}`} style={{ display: 'block', marginTop: '10px', color: '#0066cc', textDecoration: 'none' }}>
              Читати повністю →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feed;