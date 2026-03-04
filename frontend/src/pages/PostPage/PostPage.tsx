import { useParams, useNavigate } from 'react-router-dom';
import { postsData2 } from '../../data';
import styles from './PostPage.module.css';

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = postsData2.find(p => p.id === Number(postId));

  if (!post) {
    return <div className={styles.error}>Пост не знайдено 404</div>;
  }

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>← Назад</button>
      <article className={styles.post}>
        <h1>Пост від {post.author}</h1>
        <p className={styles.content}>{post.content}</p>
        <div className={styles.meta}>Категорія: {post.category}</div>
      </article>
    </div>
  );
};

export default PostPage;
