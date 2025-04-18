"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const Predictions = () => {
  const [ticker, setTicker] = useState("");
  const [predictions, setPredictions] = useState<{ date: string, price: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setPredictions([]);
    setError(null);

    try {
      const { predictions } = await api.getPredictionFromModel({ ticker });
      setPredictions(predictions);
    } catch (err) {
      setError("Failed to load prediction data. Please try again.");
      console.error("Prediction fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Stock Price Prediction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Input 
              placeholder="Enter company ticker (e.g. AAPL)" 
              value={ticker} 
              onChange={(e) => setTicker(e.target.value)} 
            />
            <Button onClick={handlePredict} disabled={loading}>
              {loading ? <Loader2 className="animate-spin w-4 h-4" /> : "Predict"}
            </Button>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          {predictions.length > 0 && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Prediction Table</h2>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Predicted Price ($)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {predictions.map((p, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{p.date}</TableCell>
                      <TableCell>{p.price.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Predictions;
