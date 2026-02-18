import React from 'react'
import { clsx } from 'clsx'
import styles from './Button.module.css'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  className?: string
}

const Button: React.FC<ButtonProps> = ({ children, onClick, variant = 'primary', className }) => {
  return (
    <button 
      className={clsx(styles.button, styles[variant], className)} 
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button