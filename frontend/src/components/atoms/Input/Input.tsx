import React from 'react'

const inputStyles = {
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: '100%'
  },
  label: {
    fontSize: '0.95rem',
    color: '#1a1a1a',
    fontWeight: 500
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    fontSize: '1rem',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    transition: 'all 0.2s ease'
  }
};

interface InputProps {
  type: string
  placeholder: string
  label?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<InputProps> = ({ type, placeholder, label, value, onChange }) => {
  return (
    <div style={inputStyles.wrapper}>
      {label && <label style={inputStyles.label}>{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={inputStyles.input}
      />
    </div>
  )
}

export default Input