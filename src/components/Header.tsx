import React from "react";
import Search from "./Search"; // Adjust the import path as necessary

interface HeaderProps {
  setStockSymbol: (symbol: string) => void; // Prop to handle stock symbol setting
}

const Header: React.FC<HeaderProps> = ({ setStockSymbol }) => {
  return (
    <header className="flex justify-between items-center p-4">
      <h1 className="text-xl font-bold"></h1>
      <Search setStockSymbol={setStockSymbol} /> {/* Pass setStockSymbol to Search */}
    </header>
  );
};

export default Header;
