import Post from './components/molecules/Post/Post';
import { postsData } from './data';

function App() {
  return (
    <div style={{ backgroundColor: '#f0f2f5', minHeight: '100vh', padding: '40px 0' }}>
      <h1 style={{ textAlign: 'center', fontFamily: 'sans-serif', marginBottom: '30px', color: "black" }}>
        Стрічка новин
      </h1>
      
      <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {postsData.map((post) => (
          <Post
            key={post.id}
            author={post.author}
            content={post.content}
            date={post.date}
            avatar={post.avatar}
          />
        ))}
      </div>
    </div>
  );
}

export default App;