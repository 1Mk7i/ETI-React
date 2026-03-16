import type { FC } from 'react';

interface PriceTagProps {
  amount: number;
}

const PriceTag: FC<PriceTagProps> = ({ amount }) => (
  <div style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#0066cc' }}>
    {amount.toLocaleString()} ₴
  </div>
);

export default PriceTag;