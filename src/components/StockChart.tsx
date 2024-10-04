"use client"; // Ensure this component is client-side

import React from 'react';
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts';

interface StockData {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
}

interface StockChartProps {
    data: StockData[];
}

const StockChart: React.FC<StockChartProps> = ({ data }) => {
    const formatDate = (date: string) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString(); // Format the date as needed
    };

    const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-teal-400 text-white bg-opacity-45 p-4 shadow-lg rounded-lg">
                    <p className="label font-bold">{`Date: ${formatDate(payload[0].payload.date)}`}</p>
                    <p>{`Open: ₹${payload[0].payload.open}`}</p>
                    <p>{`Close: ₹${payload[0].payload.close}`}</p>
                    <p>{`High: ₹${payload[0].payload.high}`}</p>
                    <p>{`Low: ₹${payload[0].payload.low}`}</p>
                    <p>{`Volume: ${payload[0].payload.volume}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height="50%" className="m-2 p-2">
            <LineChart data={data} className="hover:cursor-pointer">
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
                <XAxis 
                    dataKey="date" 
                    tickFormatter={formatDate} // Use custom formatter for X-axis
                    angle={-30} 
                    textAnchor="end" 
                    className="text-sm"
                />
                <YAxis className="text-sm" />
                <Tooltip content={<CustomTooltip />} />
                <Legend className="text-sm" />
                <Line 
                    type="monotone" 
                    dataKey="close" 
                    stroke="#8884d8" 
                    activeDot={{ r: 8 }} 
                    className="transition-all duration-300 ease-in-out hover:stroke-blue-500"
                />
                <Line 
                    type="monotone" 
                    dataKey="open" 
                    stroke="#82ca9d" 
                    className="transition-all duration-300 ease-in-out hover:stroke-green-500"
                />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default StockChart;
