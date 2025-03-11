import { useState } from 'react';
import styled from 'styled-components';
import { ISearchBarProps } from '../types/types';

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Search for a city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        disabled={isLoading}
      />
      <Button type="submit" disabled={isLoading || !city.trim()}>
        Search
      </Button>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  max-width: 500px;
  width: 100%;
  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #2196f3;
    box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
  }

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #b0b0b0;
    cursor: not-allowed;
  }
`;

export default SearchBar;
