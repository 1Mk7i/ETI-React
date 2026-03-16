import type { FC } from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: FC<StarRatingProps> = ({ rating }) => {
  return (
    <div style={{ color: '#ffc107', fontSize: '1.2rem', marginBottom: '8px' }}>
      {'★'.repeat(Math.floor(rating))}
      {'☆'.repeat(5 - Math.floor(rating))}
    </div>
  );
};

export default StarRating;