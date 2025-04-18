import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BadgeCheck, AlertTriangle, TrendingUp } from "lucide-react";

type ProfileData = {
  riskTolerance: "conservative" | "moderate" | "aggressive";
  preferredInvestments: string[];
};

const STOCK_RECOMMENDATIONS = {
  conservative: [
    { name: "Procter & Gamble (PG)", sector: "Consumer Staples" },
    { name: "Johnson & Johnson (JNJ)", sector: "Healthcare" },
    { name: "Coca-Cola (KO)", sector: "Beverages" },
    { name: "PepsiCo (PEP)", sector: "Food & Beverage" },
  ],
  moderate: [
    { name: "Apple Inc. (AAPL)", sector: "Technology" },
    { name: "Microsoft (MSFT)", sector: "Technology" },
    { name: "Visa (V)", sector: "Financials" },
    { name: "NVIDIA (NVDA)", sector: "Semiconductors" },
  ],
  aggressive: [
    { name: "Tesla (TSLA)", sector: "Automotive/EV" },
    { name: "Coinbase (COIN)", sector: "Crypto Platform" },
    { name: "Palantir (PLTR)", sector: "Tech/AI" },
    { name: "Shopify (SHOP)", sector: "E-commerce" },
    { name: "Roku (ROKU)", sector: "Streaming Tech" },
    { name: "Snap Inc. (SNAP)", sector: "Social Media" },
  ],
};

const RISK_COLORS: Record<ProfileData["riskTolerance"], string> = {
  conservative: "bg-green-100 text-green-800",
  moderate: "bg-yellow-100 text-yellow-800",
  aggressive: "bg-red-100 text-red-800",
};

const ICONS = {
  conservative: <BadgeCheck className="text-green-600 mr-2" />,
  moderate: <AlertTriangle className="text-yellow-600 mr-2" />,
  aggressive: <TrendingUp className="text-red-600 mr-2" />,
};

const Recommendations = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("moneymentor_profile");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.riskTolerance && parsed.preferredInvestments) {
          setProfile(parsed);
        }
      } catch (err) {
        console.error("Error parsing profile:", err);
      }
    }
    setIsLoaded(true);
  }, []);

  if (isLoaded && !profile) {
    return (
      <div className="p-10 text-center bg-white rounded-xl shadow-xl max-w-xl mx-auto mt-20">
        <p className="text-2xl font-bold text-red-600 mb-4">⚠️ Profile Not Found</p>
        <p className="text-gray-600 mb-6">
          You need to complete and save your profile to view personalized investment recommendations.
        </p>
        <Button onClick={() => navigate("/profile")} className="px-6 py-2 text-base">
          Go to Profile
        </Button>
      </div>
    );
  }

  if (!profile) return null;

  const showStocks = profile.preferredInvestments.includes("stocks");
  const stockRecs = showStocks ? STOCK_RECOMMENDATIONS[profile.riskTolerance] : [];
  const riskColor = RISK_COLORS[profile.riskTolerance];
  const riskIcon = ICONS[profile.riskTolerance];

  // Extract ticker symbol from string like "Apple Inc. (AAPL)"
  const getTicker = (name: string) => {
    const match = name.match(/\(([^)]+)\)/);
    return match ? match[1] : "";
  };

  return (
    <div className="bg-gradient-to-br from-white to-slate-50 min-h-screen py-12 px-4 sm:px-10">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10 text-center">
          <div className="inline-flex items-center mb-2">
            {riskIcon}
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskColor}`}>
              {profile.riskTolerance.toUpperCase()} RISK PROFILE
            </span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3">📊 Personalized Recommendations</h1>
          <p className="text-lg text-gray-700">
            Based on your <strong>{profile.riskTolerance}</strong> risk preference and interest in{" "}
            <strong>{profile.preferredInvestments.join(", ")}</strong>, here are some curated stock ideas:
          </p>
        </div>

        {showStocks && (
          <>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">📈 Stock Picks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {stockRecs.map((stock, idx) => {
                const ticker = getTicker(stock.name);
                const yahooUrl = `https://finance.yahoo.com/quote/${ticker}`;
                return (
                  <a
                    key={idx}
                    href={yahooUrl}
                    target="_self"
                    rel="noopener noreferrer"
                    className="block transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                  >
                    <Card className="bg-white border rounded-2xl h-full">
                      <CardHeader className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-t-2xl">
                        <CardTitle className="text-lg font-semibold text-indigo-900">{stock.name}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 text-gray-700">
                        <span className="text-sm text-gray-600">Sector:</span>
                        <p className="font-medium">{stock.sector}</p>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Recommendations;
