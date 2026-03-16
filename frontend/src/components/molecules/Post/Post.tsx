import React from 'react';
import Button from '../../atoms/Button/Button';
import Card from '../Card/Card';

const postStyles: { [key: string]: React.CSSProperties } = {
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1.5rem',
    gap: '1rem'
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '2px solid #e0e0e0',
    flexShrink: 0
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  author: {
    fontWeight: 600,
    fontSize: '1rem',
    color: '#1a1a1a'
  },
  date: {
    fontSize: '0.85rem',
    color: '#999999'
  },
  content: {
    marginBottom: '1.5rem',
    lineHeight: 1.7,
    color: '#666666',
    fontSize: '1rem'
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    borderTop: '1px solid #e0e0e0',
    paddingTop: '1rem',
    marginTop: '1rem'
  },
  likesCount: {
    fontSize: '0.9rem',
    color: '#0066cc',
    fontWeight: 'bold'
  }
};

export interface PostProps {
  id: number;
  author: string;
  content: string;
  category: "News" | "Updates" | "Work";
  date?: string;    // Тепер необов'язково
  avatar?: string;  // Тепер необов'язково
  likes?: number;   // Тепер необов'язково
}

const Post: React.FC<PostProps> = ({ author, content, date, avatar, likes }) => {
  return (
    <Card>
      <div style={postStyles.header}>
        <img src={avatar} alt={`${author}'s avatar`} style={postStyles.avatar} />
        <div style={postStyles.info}>
          <span style={postStyles.author}>{author}</span>
          <span style={postStyles.date}>{date}</span>
        </div>
      </div>

      <p style={postStyles.content}>{content}</p>
      
      <div style={postStyles.actions}>
        <Button variant="secondary">Лайк</Button>
        <span style={postStyles.likesCount}>❤️ {likes}</span>
        <Button variant="primary">Коментувати</Button>
      </div>
    </Card>
  );
};

export default Post;