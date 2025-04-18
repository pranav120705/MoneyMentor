
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Check, HelpCircle } from "lucide-react";

interface LessonQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  questions: LessonQuestion[];
}

// Sample lessons data
const lessons: Lesson[] = [
  {
    id: "investing-basics",
    title: "Investing Basics",
    description: "Learn the fundamental concepts of investing",
    content: `
      <h3 class="text-lg font-semibold mb-2">What is Investing?</h3>
      <p class="mb-4">Investing is the act of allocating resources, usually money, with the expectation of generating income or profit over time. Unlike saving, which involves putting money aside for future use with minimal risk, investing involves some level of risk in pursuit of potential returns.</p>
      
      <h3 class="text-lg font-semibold mb-2">Key Investment Concepts</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Risk and Return</strong>: Generally, investments with higher potential returns come with higher risks.</li>
        <li><strong>Diversification</strong>: Spreading investments across different assets to reduce risk.</li>
        <li><strong>Compound Interest</strong>: Earning interest not just on your initial investment but also on the interest accumulated over time.</li>
        <li><strong>Time Horizon</strong>: The length of time you plan to hold an investment before needing the money.</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Common Investment Types</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Stocks</strong>: Ownership shares in a company.</li>
        <li><strong>Bonds</strong>: Loans to companies or governments that pay interest.</li>
        <li><strong>Mutual Funds</strong>: Pooled money from many investors to purchase a diversified portfolio.</li>
        <li><strong>ETFs (Exchange-Traded Funds)</strong>: Similar to mutual funds but traded on exchanges like stocks.</li>
        <li><strong>Real Estate</strong>: Property investments that can provide rental income and appreciation.</li>
      </ul>
    `,
    questions: [
      {
        id: "q1",
        question: "What is the primary difference between saving and investing?",
        options: [
          "Saving is only for short-term goals, investing is for long-term goals",
          "Investing involves risk in pursuit of higher returns, while saving is low-risk",
          "Saving uses banks, investing uses brokerages",
          "There is no significant difference"
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        question: "What is diversification in investing?",
        options: [
          "Investing only in tech stocks",
          "Buying different shares of the same company",
          "Spreading investments across different asset classes to reduce risk",
          "Investing in international markets only"
        ],
        correctAnswer: 2
      },
      {
        id: "q3",
        question: "Which investment type represents ownership in a company?",
        options: [
          "Bonds",
          "Certificates of Deposit",
          "Stocks",
          "Treasury Bills"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "risk-return",
    title: "Risk vs. Return",
    description: "Understanding the relationship between risk and potential returns",
    content: `
      <h3 class="text-lg font-semibold mb-2">The Risk-Return Relationship</h3>
      <p class="mb-4">One of the most fundamental principles in investing is the relationship between risk and return. Generally, investments that offer higher potential returns come with higher levels of risk, while safer investments typically offer lower returns.</p>
      
      <h3 class="text-lg font-semibold mb-2">Risk Spectrum</h3>
      <p class="mb-4">Different investments fall along a risk spectrum:</p>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Low Risk, Low Return</strong>: Savings accounts, CDs, treasury bonds</li>
        <li><strong>Medium Risk, Medium Return</strong>: Corporate bonds, balanced mutual funds, blue-chip stocks</li>
        <li><strong>High Risk, High Return</strong>: Growth stocks, emerging markets, cryptocurrencies, startups</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Types of Investment Risk</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Market Risk</strong>: The possibility of investments losing value due to market factors</li>
        <li><strong>Inflation Risk</strong>: The risk that investment returns won't keep pace with inflation</li>
        <li><strong>Liquidity Risk</strong>: The risk of not being able to sell an investment quickly without a loss</li>
        <li><strong>Concentration Risk</strong>: The risk of having too much invested in one area</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Managing Risk</h3>
      <p class="mb-4">While risk can't be eliminated, it can be managed through:</p>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Diversification</strong>: Spreading investments across different asset classes</li>
        <li><strong>Asset Allocation</strong>: Distributing investments based on your risk tolerance and goals</li>
        <li><strong>Time Horizon</strong>: Longer investment periods can help ride out market volatility</li>
        <li><strong>Regular Rebalancing</strong>: Periodically adjusting your portfolio to maintain your target allocation</li>
      </ul>
    `,
    questions: [
      {
        id: "q1",
        question: "What is generally true about the relationship between risk and return?",
        options: [
          "Higher risk always guarantees higher returns",
          "Lower risk investments typically offer higher returns",
          "Higher potential returns usually come with higher levels of risk",
          "Risk and return are unrelated"
        ],
        correctAnswer: 2
      },
      {
        id: "q2",
        question: "Which of these is typically considered the LOWEST risk investment?",
        options: [
          "Growth stocks",
          "Treasury bonds",
          "Cryptocurrencies",
          "Startup companies"
        ],
        correctAnswer: 1
      },
      {
        id: "q3",
        question: "What is market risk?",
        options: [
          "The risk that you won't be able to sell your investment quickly",
          "The risk that your investment returns won't keep pace with inflation",
          "The possibility of investments losing value due to market factors",
          "The risk of investing in foreign markets"
        ],
        correctAnswer: 2
      }
    ]
  },
  {
    id: "mutual-funds-101",
    title: "Mutual Funds 101",
    description: "Understanding how mutual funds work and their benefits",
    content: `
      <h3 class="text-lg font-semibold mb-2">What are Mutual Funds?</h3>
      <p class="mb-4">A mutual fund is an investment vehicle that pools money from many investors to purchase a diversified portfolio of stocks, bonds, or other securities. Professional fund managers oversee the fund, making investment decisions on behalf of investors.</p>
      
      <h3 class="text-lg font-semibold mb-2">Types of Mutual Funds</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Equity Funds</strong>: Invest primarily in stocks, seeking growth</li>
        <li><strong>Bond Funds</strong>: Invest in fixed-income securities, focusing on income</li>
        <li><strong>Balanced Funds</strong>: Invest in both stocks and bonds, providing a mix of growth and income</li>
        <li><strong>Index Funds</strong>: Aim to replicate the performance of a specific market index</li>
        <li><strong>Sector Funds</strong>: Focus on specific industry sectors</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Benefits of Mutual Funds</h3>
      <ul class="list-disc pl-5 space-y-2 mb-4">
        <li><strong>Diversification</strong>: Even with a small investment, you gain exposure to many different securities</li>
        <li><strong>Professional Management</strong>: Experts make investment decisions</li>
        <li><strong>Liquidity</strong>: Shares can typically be bought or sold on any business day</li>
        <li><strong>Convenience</strong>: Fund managers handle research, trading, and administration</li>
      </ul>
      
      <h3 class="text-lg font-semibold mb-2">Important Considerations</h3>
      <ul class="list-disc pl-5 space-y-2">
        <li><strong>Expense Ratio</strong>: Annual fee expressed as a percentage of assets</li>
        <li><strong>Load Fees</strong>: Sales charges when buying (front-end load) or selling (back-end load) shares</li>
        <li><strong>Fund Objectives</strong>: Ensure the fund's goals align with your investment strategy</li>
        <li><strong>Past Performance</strong>: While not a guarantee of future results, it provides insight into the fund's history</li>
      </ul>
    `,
    questions: [
      {
        id: "q1",
        question: "What is a mutual fund?",
        options: [
          "A type of bank account that pays high interest",
          "An investment vehicle that pools money from many investors to purchase a diversified portfolio",
          "A government bond with tax benefits",
          "A type of insurance policy"
        ],
        correctAnswer: 1
      },
      {
        id: "q2",
        question: "What is an expense ratio in mutual funds?",
        options: [
          "The ratio of stocks to bonds in the fund",
          "The annual fee expressed as a percentage of assets",
          "The ratio of domestic to international investments",
          "The percentage of the fund that's currently in cash"
        ],
        correctAnswer: 1
      },
      {
        id: "q3",
        question: "Which type of mutual fund primarily aims to replicate the performance of a market index?",
        options: [
          "Sector funds",
          "Balanced funds",
          "Index funds",
          "Bond funds"
        ],
        correctAnswer: 2
      }
    ]
  }
];

const Literacy = () => {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>("content");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleLessonSelect = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setActiveTab("content");
    setAnswers({});
    setSubmitted(false);
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleQuizSubmit = () => {
    const currentLesson = lessons.find(l => l.id === selectedLesson);
    if (!currentLesson) return;
    
    let correctAnswers = 0;
    currentLesson.questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / currentLesson.questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
  };

  const currentLesson = lessons.find(l => l.id === selectedLesson);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Financial Literacy</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Boost your financial knowledge with our easy-to-understand lessons and interactive quizzes.
        </p>
      </div>

      {!selectedLesson ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="cursor-pointer hover:border-primary transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <BookOpen className="h-6 w-6" />
                </div>
                <CardTitle>{lesson.title}</CardTitle>
                <CardDescription>{lesson.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={() => handleLessonSelect(lesson.id)} className="w-full">
                  Start Lesson
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={() => setSelectedLesson(null)}>
              Back to Lessons
            </Button>
            <h2 className="text-2xl font-bold">{currentLesson?.title}</h2>
            <div className="w-[100px]"></div> {/* Empty div for flex spacing */}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="content">Lesson Content</TabsTrigger>
              <TabsTrigger value="quiz">Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="mt-6">
              <Card>
                <CardContent className="pt-6">
                  <div dangerouslySetInnerHTML={{ __html: currentLesson?.content || "" }} />
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  <Button onClick={() => setActiveTab("quiz")}>
                    Take Quiz
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="quiz" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Quiz: {currentLesson?.title}
                  </CardTitle>
                  <CardDescription>
                    Test your knowledge with these questions about {currentLesson?.title.toLowerCase()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="space-y-6">
                      <div className="text-center">
                        <h3 className="text-xl font-bold mb-2">Quiz Results</h3>
                        <div className="mb-4">
                          <Progress value={score} className="h-3" />
                          <p className="mt-2 text-sm text-muted-foreground">Your Score: {score}%</p>
                        </div>
                        {score >= 70 ? (
                          <div className="bg-green-100 text-green-800 p-4 rounded-md flex items-center gap-2">
                            <Check className="h-5 w-5" />
                            <span>Congratulations! You've passed this quiz.</span>
                          </div>
                        ) : (
                          <div className="bg-amber-100 text-amber-800 p-4 rounded-md">
                            <p>Keep learning! We recommend reviewing the lesson content again.</p>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        {currentLesson?.questions.map((q, index) => (
                          <div key={q.id} className={`p-4 rounded-md ${answers[q.id] === q.correctAnswer ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                            <p className="font-medium mb-2">
                              {index + 1}. {q.question}
                            </p>
                            <p className="text-sm">
                              {answers[q.id] === q.correctAnswer ? (
                                <span className="text-green-600 flex items-center gap-1">
                                  <Check className="h-4 w-4" /> Correct
                                </span>
                              ) : (
                                <span className="text-red-600">
                                  Incorrect. The correct answer is: {q.options[q.correctAnswer]}
                                </span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {currentLesson?.questions.map((question, index) => (
                        <div key={question.id} className="space-y-3">
                          <p className="font-medium">
                            {index + 1}. {question.question}
                          </p>
                          <RadioGroup 
                            value={answers[question.id]?.toString() || ""} 
                            onValueChange={(value) => handleAnswerSelect(question.id, parseInt(value))}
                          >
                            {question.options.map((option, idx) => (
                              <div key={idx} className="flex items-center space-x-2">
                                <RadioGroupItem value={idx.toString()} id={`${question.id}-${idx}`} />
                                <Label htmlFor={`${question.id}-${idx}`}>{option}</Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-end border-t pt-4">
                  {!submitted ? (
                    <Button
                      onClick={handleQuizSubmit}
                      disabled={currentLesson?.questions.length !== Object.keys(answers).length}
                    >
                      Submit Answers
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setActiveTab("content")}>
                        Review Lesson
                      </Button>
                      <Button onClick={() => {
                        setAnswers({});
                        setSubmitted(false);
                      }}>
                        Retry Quiz
                      </Button>
                    </div>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default Literacy;
