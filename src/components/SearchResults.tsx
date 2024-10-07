import React from "react";

interface SearchResult {
  "1. symbol": string;
  "2. name": string;
  "3. type": string;
  "4. region": string;
  "5. marketOpen": string;
  "6. marketClose": string;
  "7. timezone": string;
  "8. currency": string;
  "9. matchScore": string;
}

interface SearchResultsProps {
  results: SearchResult[];
  setStockSymbol: (symbol: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, setStockSymbol }) => {
  return (
    <div className="absolute rounded-md h-60 overflow-y-scroll bg-teal-400 z-50 w-full shadow-lg">
      {results.length > 0 ? (
        results.map((result) => (
          <div
            key={result["1. symbol"]}
            className="p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => setStockSymbol(result["1. symbol"])}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setStockSymbol(result["1. symbol"])}
          >
            <p className="text-zinc-800">
              {result["2. name"]} ({result["1. symbol"]})
            </p>
            <p className="text-sm text-gray-500">
              {result["3. type"]} - {result["4. region"]}
            </p>
          </div>
        ))
      ) : (
        <p className="p-2">No results found</p>
      )}
    </div>
  );
};

export default SearchResults;
