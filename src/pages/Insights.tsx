
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from "recharts";
import { Search, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Loader2 } from "lucide-react";

// Mock stock data
const generateMockStockData = (ticker: string, days: number = 30, startPrice: number, volatility: number) => {
  const data = [];
  let price = startPrice;
  
  // Generate dates going back from today
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Generate price movement with some randomness
    const change = ((Math.random() - 0.5) * volatility) + 0.0002; // slight upward bias
    price = price * (1 + change);
    price = Number(price.toFixed(2));
    
    data.push({
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      price: price,
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    });
  }
  
  return {
    ticker,
    data,
    currentPrice: price,
    change: Number((price - startPrice).toFixed(2)),
    percentChange: Number((((price - startPrice) / startPrice) * 100).toFixed(2)),
  };
};

// Mock market indices data
const marketIndices = [
  generateMockStockData("S&P 500", 30, 4300, 0.01),
  generateMockStockData("NASDAQ", 30, 14200, 0.015),
  generateMockStockData("DOW", 30, 34100, 0.008),
];

// Mock popular stocks data
const popularStocks = [
  generateMockStockData("AAPL", 30, 170, 0.015),
  generateMockStockData("MSFT", 30, 325, 0.012),
  generateMockStockData("AMZN", 30, 140, 0.02),
  generateMockStockData("GOOGL", 30, 135, 0.018),
  generateMockStockData("META", 30, 290, 0.025),
  generateMockStockData("TSLA", 30, 215, 0.03),
  generateMockStockData("NVDA", 30, 430, 0.035),
  generateMockStockData("BRK.B", 30, 345, 0.007),
];

// Mock crypto data
const cryptoData = [ 
  generateMockStockData("BTC", 30, 50000, 0.035),
  generateMockStockData("ETH", 30, 3000, 0.04),
  generateMockStockData("SOL", 30, 125, 0.06),
];

// Formatted data for top gainers and losers
const getAllStocks = () => {
  return [...marketIndices, ...popularStocks, ...cryptoData];
};

const Insights = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);
  
  const allStocks = getAllStocks();
  const topGainers = [...allStocks].sort((a, b) => b.percentChange - a.percentChange).slice(0, 5);
  const topLosers = [...allStocks].sort((a, b) => a.percentChange - b.percentChange).slice(0, 5);
  
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API search
    setTimeout(() => {
      const results = allStocks.filter(stock => 
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
      
      if (results.length > 0) {
        setSelectedStock(results[0]);
      }
    }, 800);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  const formatLargeNumber = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Market Insights</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Monitor market trends and get insights to make informed investment decisions.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/4">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Market Overview</TabsTrigger>
              <TabsTrigger value="stocks">Popular Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Market Indices</CardTitle>
                  <CardDescription>
                    Performance of major market indices over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={marketIndices[0].data}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['auto', 'auto']} />
                        <RechartsTooltip 
                          formatter={(value: any) => [`$${value}`, 'Price']}
                          labelFormatter={(label) => `Date: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          name="S&P 500" 
                          stroke="#3B82F6" 
                          dot={false} 
                          activeDot={{ r: 8 }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          name="NASDAQ" 
                          stroke="#10B981" 
                          dot={false} 
                          activeDot={{ r: 8 }}
                          data={marketIndices[1].data}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          name="DOW" 
                          stroke="#6366F1" 
                          dot={false} 
                          activeDot={{ r: 8 }}
                          data={marketIndices[2].data}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      Top Gainers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topGainers.map((stock) => (
                        <div key={stock.ticker} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{stock.ticker}</p>
                            <p className="text-sm text-muted-foreground">${stock.currentPrice.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center text-green-600">
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                            <span>{stock.percentChange}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-red-500" />
                      Top Losers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {topLosers.map((stock) => (
                        <div key={stock.ticker} className="flex justify-between items-center py-2 border-b last:border-0">
                          <div>
                            <p className="font-medium">{stock.ticker}</p>
                            <p className="text-sm text-muted-foreground">${stock.currentPrice.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center text-red-600">
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                            <span>{stock.percentChange}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="stocks" className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Popular Stocks Performance</CardTitle>
                  <CardDescription>
                    30-day price movement of widely-held stocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {popularStocks.slice(0, 8).map((stock) => (
                      <Button
                        key={stock.ticker}
                        variant={selectedStock?.ticker === stock.ticker ? "default" : "outline"}
                        className="h-auto py-2 px-4 justify-between"
                        onClick={() => setSelectedStock(stock)}
                      >
                        <span>{stock.ticker}</span>
                        <span className={stock.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                          {stock.percentChange >= 0 ? "+" : ""}{stock.percentChange}%
                        </span>
                      </Button>
                    ))}
                  </div>
                  
                  {selectedStock && (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-2xl font-bold">{selectedStock.ticker}</h3>
                          <p className="text-lg">${selectedStock.currentPrice.toFixed(2)}</p>
                        </div>
                        <div className={`text-lg font-semibold ${selectedStock.percentChange >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}>
                          {selectedStock.percentChange >= 0 ? <ArrowUpRight className="h-5 w-5 mr-1" /> : <ArrowDownRight className="h-5 w-5 mr-1" />}
                          {selectedStock.percentChange >= 0 ? "+" : ""}{selectedStock.percentChange}%
                        </div>
                      </div>
                      
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart
                            data={selectedStock.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis domain={['auto', 'auto']} />
                            <RechartsTooltip 
                              formatter={(value: any) => [`$${value}`, 'Price']}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="price" 
                              name={selectedStock.ticker} 
                              stroke="#3B82F6"
                              fill="#3B82F630"
                              activeDot={{ r: 8 }}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="h-40">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={selectedStock.data}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <RechartsTooltip 
                              formatter={(value: any) => [formatLargeNumber(value), 'Volume']}
                              labelFormatter={(label) => `Date: ${label}`}
                            />
                            <Bar dataKey="volume" name="Volume" fill="#10B981" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="crypto" className="space-y-6 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Cryptocurrency Markets</CardTitle>
                  <CardDescription>
                    Performance of major cryptocurrencies over the past 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {cryptoData.map((crypto) => (
                      <Card key={crypto.ticker} className={`border-2 ${crypto.percentChange >= 0 ? "border-green-200" : "border-red-200"}`}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <h3 className="font-bold">{crypto.ticker}</h3>
                            <div className={`text-sm font-semibold ${crypto.percentChange >= 0 ? "text-green-600" : "text-red-600"} flex items-center`}>
                              {crypto.percentChange >= 0 ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                              {crypto.percentChange}%
                            </div>
                          </div>
                          <p className="text-2xl font-bold mt-2">${crypto.currentPrice.toFixed(2)}</p>
                          
                          <div className="h-24 mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart
                                data={crypto.data}
                                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                              >
                                <Line 
                                  type="monotone" 
                                  dataKey="price" 
                                  stroke={crypto.percentChange >= 0 ? "#10B981" : "#EF4444"} 
                                  dot={false} 
                                  strokeWidth={2}
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                  <Card className="bg-muted/50 mt-6">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        <strong>Note:</strong> Cryptocurrencies are highly volatile assets and may not be suitable for all investors. 
                        Past performance is not indicative of future results.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="md:w-1/4">
          <Card>
            <CardHeader>
              <CardTitle>Search Ticker</CardTitle>
              <CardDescription>Look up any stock or index</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Input 
                  placeholder="Enter ticker symbol" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <Button onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                </Button>
              </div>
              
              {searchResults.length > 0 && (
                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium">Results:</p>
                  {searchResults.map((result) => (
                    <Button
                      key={result.ticker}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => {
                        setSelectedStock(result);
                        setActiveTab("stocks");
                      }}
                    >
                      <span>{result.ticker}</span>
                      <span className={result.percentChange >= 0 ? "text-green-500" : "text-red-500"}>
                        {result.percentChange >= 0 ? "+" : ""}{result.percentChange}%
                      </span>
                    </Button>
                  ))}
                </div>
              )}
              
              {searchQuery && searchResults.length === 0 && !isSearching && (
                <p className="text-sm text-muted-foreground mt-2">No results found for "{searchQuery}"</p>
              )}
            </CardContent>
            <CardFooter className="flex-col items-start border-t pt-4">
              <p className="text-sm font-medium">Example Tickers:</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {["AAPL", "MSFT", "GOOGL", "AMZN", "S&P 500"].map((ticker) => (
                  <Button
                    key={ticker}
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSearchQuery(ticker);
                      setIsSearching(true);
                      setTimeout(() => {
                        const result = allStocks.find(s => s.ticker === ticker);
                        if (result) {
                          setSearchResults([result]);
                          setSelectedStock(result);
                          setActiveTab("stocks");
                        }
                        setIsSearching(false);
                      }, 500);
                    }}
                  >
                    {ticker}
                  </Button>
                ))}
              </div>
            </CardFooter>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Market News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { title: "Fed Holds Interest Rates Steady", date: "2 hours ago" },
                  { title: "Tech Stocks Rally on Strong Earnings", date: "5 hours ago" },
                  { title: "Oil Prices Fall on Supply Concerns", date: "Yesterday" },
                  { title: "Inflation Data Shows Cooling Trend", date: "Yesterday" },
                  { title: "Market Volatility Expected Ahead of Elections", date: "2 days ago" },
                ].map((news, index) => (
                  <div key={index} className="pb-3 border-b last:border-0 last:pb-0">
                    <h3 className="text-sm font-medium hover:text-primary cursor-pointer">
                      {news.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full text-sm">
                View All News
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> The data shown here is simulated and for educational purposes only. 
            It does not represent actual market data. Investment decisions should not be made based solely on this information. 
            Always conduct thorough research or consult a financial advisor before investing.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Insights;
