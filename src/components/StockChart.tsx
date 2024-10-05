"use client"; // Ensure this component is client-side

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

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

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: any[];
  }) => {
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

  const getGradientOffset = () => {
    const dataMax = Math.max(...data.map(i => i.close)); 
    const dataMin = Math.min(...data.map(i => i.close));
  
    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }
  
    return dataMax / (dataMax - dataMin);
  };

  const off = getGradientOffset(); // Get the dynamic offset for the gradient

  return (
    <ResponsiveContainer width="100%" height="90%" className="m-2 p-2">
      <AreaChart data={data} className="hover:cursor-pointer">
        <CartesianGrid strokeDasharray="3 3" className="stroke-gray-300" />
        <XAxis
          dataKey="date"
          tickFormatter={formatDate} 
          angle={-10}
          textAnchor="end"
          className="text-[10px]"
        />
        <YAxis className="text-sm" />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          className="text-sm"
          align="center"
          verticalAlign="top"
          margin={{ top: 5, bottom: 5 }}
        />

        <defs>
          <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
            <stop offset={off} stopColor="green" stopOpacity={1} />
            <stop offset={off} stopColor="red" stopOpacity={1} />
          </linearGradient>
        </defs>

        <Area
          type="monotone"
          dataKey="close"
          stroke="#4A90E2"
          fill="url(#splitColor)"  // Use the gradient
          fillOpacity={0.3}
          strokeWidth={0.5}
        />
        <Area
          type="monotone"
          dataKey="open"
          stroke="#50E3C2"
          fillOpacity={0.3}  // Adjust fill opacity if needed
          className="transition-all duration-300 ease-in-out hover:stroke-green-500"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default StockChart;
