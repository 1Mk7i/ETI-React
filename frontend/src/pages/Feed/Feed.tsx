import { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/molecules/SearchBar/SearchBar';
import PostCard from '../../components/molecules/Post/Post';
import { postsData2 } from '../../data';
import styles from './Feed.module.css';

const Feed = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = postsData2.filter(post => 
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section>
      <h2>Стрічка новин</h2>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <div className={styles.feed} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <div key={post.id} style={{ position: 'relative' }}>
              <PostCard 
                key={post.id} 
                {...post}
                date="Сьогодні" 
                avatar="https://via.placeholder.com/150" 
                likes={0}
              />
              <Link 
                to={`/feed/${post.id}`}
                style={{
                  display: 'inline-block',
                  marginTop: '10px',
                  color: '#007bff',
                  textDecoration: 'none',
                  fontWeight: 'bold'
                }}
              >
                Читати далі →
              </Link>
            </div>
          ))
        ) : (
          <p className={styles.empty}>Новин не знайдено.</p>
        )}
      </div>
    </section>
  );
};

export default Feed;
