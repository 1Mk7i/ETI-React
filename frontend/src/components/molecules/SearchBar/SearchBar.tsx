import React from 'react';

const searchBarStyles = {
  wrapper: {
    margin: '0 0 2rem 0',
    width: '100%',
    maxWidth: '600px'
  },
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    fontSize: '1rem',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '6px',
    outline: 'none',
    transition: 'all 0.2s ease'
  }
};

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div style={searchBarStyles.wrapper}>
      <input
        type="text"
        placeholder="Пошук постів..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        style={searchBarStyles.input}
      />
    </div>
  );
};

export default SearchBar;