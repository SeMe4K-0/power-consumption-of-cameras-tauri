import { type FC, useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Найти...", 
  initialValue = "" 
}) => {
  const [searchQuery, setSearchQuery] = useState<string>(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder={placeholder}
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          <img src="/src/assets/search_icon.png" alt="Search" className="search-icon" />
        </button>
      </form>
    </div>
  );
};
