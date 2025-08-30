// indianApi.ts
import axios from "axios";

const client = axios.create({
    baseURL: "https://stock.indianapi.in",
    headers: {
        "X-Api-Key": "sk-live-7wXqWfNxx03SXjqgpX7UPuackoivN1cfGcCEK68q", // ⚠️ Keep safe in .env
    },
});

// 1. Get Company Data by Name
export const getCompanyData = async (name: string) => {
    const { data } = await client.get(`/stock?name=${encodeURIComponent(name)}`);
    return data;
};

// 2. Industry Search
export const searchIndustry = async (query: string) => {
    const { data } = await client.get(`/industry_search?query=${encodeURIComponent(query)}`);
    return data;
};

// 3. Mutual Fund Search
export const searchMutualFunds = async (query: string) => {
    const { data } = await client.get(`/mutual_fund_search?query=${encodeURIComponent(query)}`);
    return data;
};

// 4. Trending Stocks (Top Gainers / Losers)
export const getTrending = async () => {
    const { data } = await client.get(`/trending`);
    return data.trending_stocks;
};

// 5. 52 Week High / Low
export const get52WeekHighLow = async () => {
    const { data } = await client.get(`/fetch_52_week_high_low_data`);
    return data;
};

// 6. NSE Most Active
export const getNSEMostActive = async () => {
    const { data } = await client.get(`/NSE_most_active`);
    return data;
};

// 7. BSE Most Active
export const getBSEMostActive = async () => {
    const { data } = await client.get(`/BSE_most_active`);
    return data;
};

// 8. Mutual Funds (Latest NAVs)
export const getMutualFunds = async () => {
    const { data } = await client.get(`/mutual_funds`);
    return data;
};

// 9. Price Shockers
export const getPriceShockers = async () => {
    const { data } = await client.get(`/price_shockers`);
    return data;
};

// 10. Commodities Futures Data
export const getCommodities = async () => {
    const { data } = await client.get(`/commodities`);
    return data;
};

// 11. Analyst Recommendations + Target Price
export const getStockTargetPrice = async (stockId: string) => {
    const { data } = await client.get(`/stock_target_price?stock_id=${stockId}`);
    return data;
};

// 12. Stock Forecasts
export const getStockForecasts = async (
    stockId: string,
    measureCode: string,
    periodType: string,
    dataType: string,
    age: string
) => {
    const { data } = await client.get(
        `/stock_forecasts?stock_id=${stockId}&measure_code=${measureCode}&period_type=${periodType}&data_type=${dataType}&age=${age}`
    );
    return data;
};

// 13. Historical Data
export const getHistoricalData = async (stockName: string, period = "1yr", filter = "price") => {
    const { data } = await client.get(
        `/historical_data?symbol=${stockName}&period=${period}&filter=${filter}`
    );
    return data;
};

// 14. Historical Stats (Quarter Results, Ratios, BalanceSheet, etc.)
export const getHistoricalStats = async (stockName: string, stats: string) => {
    const { data } = await client.get(`/historical_stats?stock_name=${stockName}&stats=${stats}`);
    return data;
};
