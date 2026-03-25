import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { postsData2 } from '../../data';

const postPageStyles: { [key: string]: React.CSSProperties } = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '20px 20px' },
  backBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#0066cc',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '2rem',
    fontSize: '1rem',
    fontWeight: 500
  },
  post: {
    backgroundColor: '#ffffff',
    padding: '2.5rem',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
  },
  title: { color: '#1a1a1a', marginBottom: '1.5rem', fontSize: '2rem' },
  content: { fontSize: '1.1rem', lineHeight: 1.8, color: '#666666', marginBottom: '2rem' },
  meta: { fontSize: '0.95rem', color: '#999999', borderTop: '1px solid #e0e0e0', paddingTop: '1.5rem', marginTop: '2rem' },
  error: { padding: '3rem 2rem', textAlign: 'center', color: '#dc3545', fontSize: '1.2rem' }
};

const PostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const navigate = useNavigate();

  const post = postsData2.find(p => p.id === Number(postId));

  if (!post) {
    return (
      <div style={postPageStyles.container}>
        <button onClick={() => navigate('/feed')} style={postPageStyles.backBtn}>← До списку</button>
        <div style={postPageStyles.error}>Пост #{postId} не знайдено 404</div>
      </div>
    );
  }

  return (
    <div style={postPageStyles.container}>
      <button onClick={() => navigate(-1)} style={postPageStyles.backBtn}>← Назад</button>
      <article style={postPageStyles.post}>
        <h1 style={postPageStyles.title}>Пост від {post.author}</h1>
        <p style={postPageStyles.content}>{post.content}</p>
        <div style={postPageStyles.meta}>Категорія: {post.category}</div>
      </article>
    </div>
  );
};

export default PostPage;