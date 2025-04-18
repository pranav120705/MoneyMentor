import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { api } from "@/lib/api";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    text: "Hi there! I'm MoneyMentor, your AI financial assistant. How can I help you today?",
    sender: "bot",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [useMockResponses, setUseMockResponses] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll to bottom of messages container
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await api.sendChatMessage(input, useMockResponses);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.response,
        sender: "bot",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('[Chatbot] Error:', error);
      const errorMessage = error instanceof Error ? error.message : "Network error occurred";
      
      const botError: Message = {
        id: `err-${Date.now()}`,
        text: `⚠️ ${errorMessage}\n\nHere's some general advice:\n${getFallbackResponse(input)}`,
        sender: "bot",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botError]);
    } finally {
      setIsTyping(false);
    }
  };

  const getFallbackResponse = (query: string): string => {
    const fallbacks: Record<string, string> = {
      "How to start investing?": "Start with just $100 in a low-cost index fund like VTI. The key is consistency - invest regularly.",
      "Best stocks for 2024?": "Consider ETFs instead of individual stocks for diversification. VOO tracks the S&P 500.",
      "IRA vs 401k?": "Max out employer 401k match first, then contribute to an IRA. Roth options are great for tax-free growth.",
      "Budgeting tips": "Try the 80/20 rule: Save 20% of income, live on 80%. Even 10% savings makes a difference long-term."
    };
    
    return fallbacks[query] || "For financial success, focus on:\n1. Spending less than you earn\n2. Investing the difference\n3. Being patient";
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    toast({
      title: "Question ready!",
      description: "Press the send button to ask",
    });
    document.getElementById("chat-input")?.focus();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-3xl shadow-lg border-0 overflow-hidden flex flex-col h-[80vh]">
          <CardHeader className="bg-blue-600 text-white p-6">
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-3">
                <div className="relative">
                  <span className={`absolute inline-flex h-3 w-3 rounded-full ${useMockResponses ? 'bg-amber-400' : 'bg-green-400'} opacity-75 animate-ping`}></span>
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${useMockResponses ? 'bg-amber-500' : 'bg-green-500'}`}></span>
                </div>
                <span>MoneyMentor AI</span>
              </CardTitle>
              <div className="flex items-center gap-2">
                <Label htmlFor="mock-mode" className="text-white/80 text-sm">
                  {useMockResponses ? "Mock Mode" : "Live Mode"}
                </Label>
                <Switch
                  id="mock-mode"
                  checked={useMockResponses}
                  onCheckedChange={setUseMockResponses}
                  className="data-[state=checked]:bg-amber-500"
                />
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col overflow-hidden p-0">
            {/* Messages container with independent scrolling */}
            <div 
              ref={messagesContainerRef}
              className="flex-1 overflow-y-auto p-6 space-y-4"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-800 rounded-bl-none border"
                    }`}
                  >
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold">
                        {message.sender === "user" ? "You" : "MoneyMentor"}
                      </span>
                      <span className="text-xs opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="whitespace-pre-wrap">{message.text}</div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-[85%] rounded-2xl rounded-bl-none bg-gray-100 px-4 py-3 border">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold">MoneyMentor</span>
                    </div>
                    <div className="flex gap-1">
                      <span className="animate-bounce">●</span>
                      <span className="animate-bounce delay-100">●</span>
                      <span className="animate-bounce delay-200">●</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input area - stays fixed at bottom */}
            <div className="border-t bg-gray-50 p-4">
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="flex gap-2">
                  <Input
                    id="chat-input"
                    placeholder="Ask about investments, savings, or financial planning..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isTyping}
                    className="flex-1 rounded-full shadow-sm"
                  />
                  <Button
                    type="submit"
                    disabled={isTyping || !input.trim()}
                    className="rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "How to start investing?",
                    "Best stocks for 2024?",
                    "IRA vs 401k?",
                    "Budgeting tips"
                  ].map((question) => (
                    <Button
                      key={question}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs h-8 truncate"
                      onClick={() => handleQuickQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chatbot;