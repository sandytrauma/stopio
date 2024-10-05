import { useState, useEffect } from "react";
import SearchResults from "./SearchResults"; // Adjust the import path as necessary
import { MagnifyingGlassCircleIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface SearchProps {
  setStockSymbol: (symbol: string) => void;
}

// Updated searchSymbol function
const searchSymbol = async (query: string) => {
  const apiKey = process.env.ALPHA_VANTAGE_SYMBOL_SEARCH_API_KEY; 
  const response = await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${apiKey}`
  );
  console.log(response)
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  
  const data = await response.json();
  return data;
};

const Search: React.FC<SearchProps> = ({ setStockSymbol }) => {
  const [input, setInput] = useState<string>("");
  const [bestMatches, setBestMatches] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const updateBestMatches = async () => {
    if (!input) return;

    try {
      const searchResults = await searchSymbol(input);
      const result = searchResults.bestMatches || []; // Updated to access 'bestMatches'
      setBestMatches(result);
      setError(""); // Clear any previous errors
    } catch (error) {
      setBestMatches([]);
      setError("Failed to fetch search results. Please try again.");
      console.error(error);
    }
  };

  const clear = () => {
    setInput("");
    setBestMatches([]);
    setError("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      updateBestMatches();
    }
  };

  // Debounce effect to prevent rapid API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      if (input) updateBestMatches();
    }, 300); // Adjust the debounce time as necessary

    return () => {
      clearTimeout(handler);
    };
  }, [input]);

  return (
    <div className="flex items-center my-4 border-2 rounded-md relative z-50 w-60 bg-white border-neutral-200">
      <input
        type="text"
        value={input}
        className="w-full px-4 py-2 focus:outline-none rounded-md"
        placeholder="Search stock..."
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      {input && (
        <button onClick={clear} className="m-1">
          <XMarkIcon className="h-4 w-4 fill-gray-500" />
        </button>
      )}
      <button
        onClick={updateBestMatches}
        className="h-8 w-8 bg-indigo-600 rounded-md flex justify-center items-center m-1 p-2 transition duration-300 hover:ring-2 ring-indigo-400"
      >
        <MagnifyingGlassCircleIcon className="h-4 w-4 fill-gray-100" />
      </button>
      {input && bestMatches.length > 0 ? (
        <SearchResults results={bestMatches} setStockSymbol={setStockSymbol} />
      ) : (
        error && <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default Search;