// src/app/api/stock/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
    const symbol = 'RELIANCE.BSE';
    const outputsize = 'full';
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&outputsize=${outputsize}&apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        console.log("Response status:", response.status); // Log response status

        if (!response.ok) {
            const errorText = await response.text(); // Get error response text
            console.error("Response error:", errorText); // Log error response text
            throw new Error('Failed to fetch stock data');
        }

        const data = await response.json();
        const timeSeries = data['Time Series (Daily)'] as Record<string, { 
            '1. open': string; 
            '2. high': string; 
            '3. low': string; 
            '4. close': string; 
            '5. volume': string; 
        }> | undefined;

        if (!timeSeries) {
            console.error("Time Series data is undefined or null");
            throw new Error('Time Series data is unavailable');
        }

        const parsedData = Object.entries(timeSeries).map(([date, values]) => ({
            date,
            open: values['1. open'],
            high: values['2. high'],
            low: values['3. low'],
            close: values['4. close'],
            volume: values['5. volume'],
        }));

        return NextResponse.json(parsedData);
    } catch (error) {
        console.error("Error fetching data:", error instanceof Error ? error.message : error);
        return NextResponse.json({ error: 'Failed to fetch stock data' }, { status: 500 });
    }
}
