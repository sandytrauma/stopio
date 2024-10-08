"use client";
import React, { useEffect, useState } from 'react';
import StockChart from "@/components/StockChart";
import Stock from '@/components/Stock';
import Header from '@/components/Header';

interface StockData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default function Home() {
  const [stockData, setStockData] = useState<StockData[]>([]);
  const [stockSymbol, setStockSymbol] = useState<string>("");

  const fetchStockData = async () => {
    try {
      const response = await fetch('/api/ipo'); // Use the correct API endpoint
      if (!response.ok) {
        throw new Error('Failed to fetch stock data');
      }
      const data = await response.json();
      setStockData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  return (
    <div className="h-screen grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-rows-8 md:grid-rows-7 xl:grid-rows-5 auto-rows-fr gap-6 p-10 font-quicksand">
      <div className="col-span-1 md:col-span-2 xl:col-span-3 row-span-1 flex justify-start items-center">
        <Header setStockSymbol={setStockSymbol} />
      </div>
      <div className="md:col-span-2 row-span-4">
        {stockData.length > 0 ? ( // Check if there is stock data before rendering the chart
          <StockChart data={stockData.slice(0, 900)} />
        ) : (
          <p className="text-center">Loading chart...</p>
        )}
      </div>
      <div className="bg-gray-300">Overview</div>
      <div className="row-span-2 xl:row-span-3 overflow-scroll">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Historical Data</h1>
        <Stock/> {/* Pass stockSymbol if needed */}
      </div>
    </div>
  );
}