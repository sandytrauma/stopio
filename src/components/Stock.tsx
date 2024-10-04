"use client"; // Ensure this component is client-side

import { useEffect, useState } from 'react';
import StockChart from './StockChart';

interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

const Stock = () => {
    const [stockData, setStockData] = useState<StockData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const rowsPerPage = 10;

    const fetchStockData = async () => {
        try {
            const response = await fetch(`/api/ipo`); // Fetching from the hardcoded API route
            if (!response.ok) {
                throw new Error('Failed to fetch stock data');
            }
            const data = await response.json();
            setStockData(data);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockData();
    }, []);

    const handleNextPage = () => {
        if ((page + 1) * rowsPerPage < stockData.length) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    const displayedData = stockData.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    return (
        <div className="p-4 md:p-6 lg:p-8 bg-gray-100 min-h-screen flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-center mb-4">Daily Stock Data</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="p-4 bg-white shadow-md rounded-lg">
                    <StockChart data={stockData.slice(0, 30)} /> {/* Display the last 30 entries in the chart for better analysis */}
                </div>
                <div className="p-4 bg-white shadow-md rounded-lg">
                    <table className="table-auto w-full mb-6 border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Date</th>
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Open</th>
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">High</th>
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Low</th>
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Close</th>
                                <th className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">Volume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedData.map((stock, index) => (
                                <tr key={index} className="hover:bg-gray-100 transition duration-200">
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.date}</td>
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.open}</td>
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.high}</td>
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.low}</td>
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.close}</td>
                                    <td className="border border-gray-300 px-2 py-2 md:px-4 md:py-3">{stock.volume}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button onClick={handlePrevPage} disabled={page === 0} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
                            Previous
                        </button>
                        <button onClick={handleNextPage} disabled={(page + 1) * rowsPerPage >= stockData.length} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-50">
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stock;
