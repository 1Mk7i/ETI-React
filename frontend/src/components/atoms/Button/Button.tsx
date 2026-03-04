import React from 'react'
import { clsx } from 'clsx'

const buttonStyles = {
  base: {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    whiteSpace: 'nowrap'
  },
  primary: {
    backgroundColor: '#0066cc',
    color: '#fff'
  },
  primaryHover: {
    backgroundColor: '#0052a3'
  },
  secondary: {
    backgroundColor: '#f5f5f5',
    color: '#1a1a1a',
    border: '1px solid #e0e0e0'
  },
  secondaryHover: {
    backgroundColor: '#eaeaea'
  }
};

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className }) => {
  const [hover, setHover] = React.useState(false);

  const style: React.CSSProperties = {
    ...buttonStyles.base,
    ...(variant === 'primary' ? buttonStyles.primary : buttonStyles.secondary),
    ...(hover && (variant === 'primary' ? buttonStyles.primaryHover : buttonStyles.secondaryHover))
  };

  return (
    <button
      style={style}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button