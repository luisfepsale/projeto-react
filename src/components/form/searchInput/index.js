import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

export default function SearchInput({ onSearch }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      style={{ width: 400}}
      label="Pesquisar"
      variant="outlined"
      value={searchValue}
      onChange={handleSearchChange}
    />
  );
}