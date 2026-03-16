import type { FC } from 'react';
import StarRating from './StarRating';

export interface ProductDetailsProps {
  title: string;
  description: string;
  rating: number;
  amount: number;
}

const ProductDetails: FC<ProductDetailsProps> = ({ title, description, rating, amount }) => (
  <div style={{ marginBottom: '15px' }}>
    <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem', color: '#1a1a1a' }}>
      {title}
    </h3>
    <p style={{ 
      color: '#666', 
      fontSize: '0.9rem', 
      lineHeight: '1.4',
      margin: '0 0 12px 0' 
    }}>
      {description}
    </p>
    
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <StarRating rating={rating} />
      <span style={{ fontWeight: '600', color: '#0066cc' }}>
        {amount} ₴ / шт.
      </span>
    </div>
  </div>
);

export default ProductDetails;