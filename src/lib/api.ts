const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Interfaces
export interface ChatbotRequest {
  query: string;
  use_mock?: boolean;
}

export interface ChatbotResponse {
  response: string;
}

export interface LiteracyData {
  lessons: {
    id: number;
    title: string;
    description: string;
    content: string;
    quiz: {
      question: string;
      options: string[];
      correct: number;
    }[];
  }[];
}

export interface RecommendationRequest {
  age: number;
  income: number;
  riskLevel: 'low' | 'medium' | 'high';
  goals: string[];
}

export interface Recommendation {
  type: string;
  risk: string;
  rationale: string;
  learnMoreUrl: string;
}

export interface RecommendationResponse {
  recommendations: Recommendation[];
}

export interface MarketData {
  indices: {
    name: string;
    value: number;
    change: number;
  }[];
  top_gainers: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }[];
  top_losers: {
    symbol: string;
    name: string;
    price: number;
    change: number;
  }[];
}

export interface ProfileData {
  name: string;
  age: number;
  riskAppetite: string;
  goals: string[];
  preferredProducts: string[];
}
export interface PredictionRequest {
  ticker: string;
}

export interface Prediction {
  date: string;
  price: number;
}

export interface PredictionResponse {
  predictions: Prediction[];
}
// API client
export const api = {
  // Chatbot
  async sendChatMessage(query: string, useMock: boolean = false): Promise<ChatbotResponse> {
    const res = await fetch(`${API_BASE_URL}/api/chatbot`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, use_mock: useMock }),
    });

    if (!res.ok) {
      throw new Error(`Chatbot error: ${res.statusText}`);
    }

    const data: ChatbotResponse = await res.json();
    return data;
  },

  // Financial Literacy
  async getLiteracyData(): Promise<LiteracyData> {
    const res = await fetch(`${API_BASE_URL}/api/literacy`);

    if (!res.ok) {
      throw new Error(`Literacy data error: ${res.statusText}`);
    }

    const data: LiteracyData = await res.json();
    return data;
  },

  // Investment Recommendations
  async getRecommendations(data: RecommendationRequest): Promise<RecommendationResponse> {
    const res = await fetch(`${API_BASE_URL}/api/recommendations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Recommendations error: ${res.statusText}`);
    }

    const response: RecommendationResponse = await res.json();
    return response;
  },

  // Market Data
  async getMarketData(): Promise<MarketData> {
    const res = await fetch(`${API_BASE_URL}/api/insights`);

    if (!res.ok) {
      throw new Error(`Market data error: ${res.statusText}`);
    }

    const data: MarketData = await res.json();
    return data;
  },

  // User Profile
  async saveProfile(data: ProfileData): Promise<{ message: string; data: ProfileData }> {
    const res = await fetch(`${API_BASE_URL}/api/profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Profile save error: ${res.statusText}`);
    }

    const result = await res.json();
    return result;
  },
  async getPredictionFromModel(data: PredictionRequest): Promise<PredictionResponse> {
    const res = await fetch(`${API_BASE_URL}/api/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Prediction fetch error: ${res.statusText}`);
    }

    const result = await res.json();
    return { predictions: result.predictions };
  }
};
