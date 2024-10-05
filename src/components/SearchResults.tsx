import React from "react";

interface SearchResult {
  symbol: string;
  description: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  setStockSymbol: (symbol: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, setStockSymbol }) => {
  return (
    <ul className="absolute top-12 border-2 w-full rounded-md h-64 overflow-y-scroll bg-white border-neutral-200 custom-scrollbar">
      {results.map((item) => (
        <li
          key={item.symbol}
          className="cursor-pointer p-4 m-2 flex items-center text-black justify-between rounded-md hover:bg-indigo-200 transition duration-300"
          onClick={() => setStockSymbol(item.symbol)}
        >
          <span>{item.symbol}</span>
          <span>{item.description}</span>
        </li>
      ))}
    </ul>
  );
};

export default SearchResults;
