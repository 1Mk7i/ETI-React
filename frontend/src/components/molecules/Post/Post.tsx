import React from 'react';
import Button from '../../atoms/Button/Button';
import Card from '../Card/Card';
import styles from './Post.module.css';

interface PostProps {
  author: string;
  content: string;
  date: string;
  avatar: string;
}

const Post: React.FC<PostProps> = ({ author, content, date, avatar }) => {
  return (
    <Card>
      <div className={styles.header}>
        <img src={avatar} alt={`${author}'s avatar`} className={styles.avatar} />
        <div className={styles.info}>
          <span className={styles.author}>{author}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>

      <p className={styles.content}>{content}</p>
      
      <div className={styles.actions}>
        <Button variant="secondary">Лайк</Button>
        <Button variant="primary">Коментувати</Button>
      </div>
    </Card>
  );
};

export default Post;