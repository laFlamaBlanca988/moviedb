// SearchContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";

type CategoryType = string;

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: CategoryType;
  setSelectedCategory: (category: CategoryType) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const useGlobalContext = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};
export const GlobalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const category = location.pathname.split("/")[1];

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    category ? category : "shows"
  );

  const value: SearchContextType = {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
  };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
