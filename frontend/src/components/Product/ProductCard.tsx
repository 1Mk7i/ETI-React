import { useState, type FC } from 'react';
import ProductDetails from './ProductDetails';
import PriceTag from './PriceTag';
import Button from '../atoms/Button/Button';

interface ProductCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  image: string;
}

const ProductCard: FC<ProductCardProps> = ({ title, description, price, rating, image }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleBuy = () => {
    alert(`Додано: ${title}\nКількість: ${quantity}\nСума: ${price * quantity} ₴`);
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      overflow: 'hidden',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <img 
        src={image} 
        alt={title} 
        style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <ProductDetails 
            title={title} 
            description={description} 
            rating={rating} 
            amount={price}
        />
        
        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <div style={{ display: 'flex', border: '1px solid #ddd', borderRadius: '4px' }}>
              <button onClick={handleDecrement} style={{ padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer' }}>-</button>
              <span style={{ padding: '5px 10px', borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd' }}>{quantity}</span>
              <button onClick={handleIncrement} style={{ padding: '5px 10px', border: 'none', background: 'none', cursor: 'pointer' }}>+</button>
            </div>
            <PriceTag amount={price * quantity} />
          </div>
          
          <Button onClick={handleBuy}>
            Купити
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;