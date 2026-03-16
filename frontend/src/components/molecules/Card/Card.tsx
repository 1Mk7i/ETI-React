import React from 'react'

const cardStyle: React.CSSProperties = {
  background: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
  border: '1px solid #e0e0e0',
  padding: '1.5rem',
  transition: 'all 0.2s ease'
};

interface CardProps {
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ children }) => {
  return <div style={cardStyle}>{children}</div>
}

export default Card