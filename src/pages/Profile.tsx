
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CheckCircle, User, BookOpen, TrendingUp, MessageSquare } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

// Constants
const RISK_LEVELS = ["conservative", "moderate", "aggressive"] as const;
const INVESTMENT_GOALS = ["retirement", "education", "home", "wealth", "income"] as const;
const PREFERRED_INVESTMENTS = ["stocks", "bonds", "etfs", "mutual_funds", "crypto", "real_estate"] as const;
const EMPLOYMENT_STATUSES = ["employed", "self_employed", "unemployed", "student", "retired"] as const;

// Form schema
const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(50, {
      message: "Name must not be longer than 50 characters.",
    }),
  email: z.string().email(),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 18, {
    message: "Age must be at least 18",
  }),
  employmentStatus: z.enum(EMPLOYMENT_STATUSES),
  annualIncome: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Income must be a positive number",
  }),
  investmentExperience: z.string(),
  riskTolerance: z.enum(RISK_LEVELS),
  investmentGoals: z.enum(INVESTMENT_GOALS),
  timeHorizon: z.string(),
  preferredInvestments: z.enum(PREFERRED_INVESTMENTS).array(),
  additionalInfo: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// Mock learning progress
const learningProgress = {
  lessonsCompleted: 3,
  totalLessons: 10,
  quizScores: [
    { title: "Investing Basics", score: 80 },
    { title: "Risk vs. Return", score: 75 },
    { title: "Mutual Funds 101", score: 90 },
  ],
  currentStreak: 3,
  badges: [
    { name: "Getting Started", description: "Completed your profile" },
    { name: "First Lesson", description: "Completed your first lesson" },
    { name: "Quiz Master", description: "Scored 90% or above on a quiz" },
  ],
};

// Mock chat history
const mockChatHistory = [
  {
    id: 1,
    question: "What is a mutual fund?",
    date: "2 days ago",
  },
  {
    id: 2,
    question: "How do I start investing with a small amount of money?",
    date: "1 week ago",
  },
  {
    id: 3,
    question: "What's the difference between stocks and bonds?",
    date: "2 weeks ago",
  },
];

// Mock recommendation history
const mockRecommendations = [
  {
    id: 1,
    title: "Index Funds",
    date: "3 days ago",
    riskLevel: "Medium",
  },
  {
    id: 2,
    title: "Blue-Chip Stocks",
    date: "3 days ago",
    riskLevel: "Medium",
  },
  {
    id: 3,
    title: "Government Bonds",
    date: "3 days ago",
    riskLevel: "Low",
  },
];

// Default form values - simulating values stored in local storage
const defaultValues: Partial<ProfileFormValues> = {
  fullName: "",
  email: "",
  age: "",
  employmentStatus: "employed",
  annualIncome: "",
  investmentExperience: "beginner",
  riskTolerance: "moderate",
  investmentGoals: "retirement",
  timeHorizon: "long",
  preferredInvestments: ["etfs", "stocks"],
  additionalInfo: "",
};

const Profile = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  
  // Initialize form with values from localStorage if they exist
  const [storedValues, setStoredValues] = useState<Partial<ProfileFormValues>>(defaultValues);
  
  useEffect(() => {
    const savedProfile = localStorage.getItem("moneymentor_profile");
    if (savedProfile) {
      try {
        const parsedProfile = JSON.parse(savedProfile);
        setStoredValues(parsedProfile);
      } catch (error) {
        console.error("Error parsing saved profile:", error);
      }
    }
  }, []);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: storedValues,
  });
  
  // Update form when storedValues change
  useEffect(() => {
    form.reset(storedValues);
  }, [storedValues, form]);
  
  function onSubmit(data: ProfileFormValues) {
    setIsSaving(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Save to localStorage
      localStorage.setItem("moneymentor_profile", JSON.stringify(data));
      setStoredValues(data);
      
      setIsSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been saved successfully.",
      });
    }, 1000);
  }
  
  const calculateCompletionPercentage = () => {
    const totalFields = Object.keys(profileFormSchema.shape).length;
    const filledFields = Object.keys(storedValues).filter(key => {
      const value = storedValues[key as keyof ProfileFormValues];
      return value !== undefined && value !== "" && (
        !Array.isArray(value) || value.length > 0
      );
    }).length;
    
    return Math.round((filledFields / totalFields) * 100);
  };
  
  const completionPercentage = calculateCompletionPercentage();

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Your Profile</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Personalize your MoneyMentor experience and track your financial learning journey.
        </p>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="profile">Profile & Preferences</TabsTrigger>
          <TabsTrigger value="progress">Learning Progress</TabsTrigger>
          <TabsTrigger value="history">Activity History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <CardTitle>Personal & Financial Profile</CardTitle>
                  <CardDescription>
                    Share your information to receive personalized recommendations
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {completionPercentage < 100 && (
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Profile Completion</span>
                    <span>{completionPercentage}%</span>
                  </div>
                  <Progress value={completionPercentage} className="h-2" />
                </div>
              )}
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input placeholder="Your age" {...field} type="number" min="18" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="employmentStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Status</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employed">Employed</SelectItem>
                              <SelectItem value="self_employed">Self-Employed</SelectItem>
                              <SelectItem value="unemployed">Unemployed</SelectItem>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="retired">Retired</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="annualIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Annual Income ($)</FormLabel>
                          <FormControl>
                            <Input placeholder="Your income" {...field} type="number" min="0" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="investmentExperience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Investment Experience</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select experience level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner (Less than 1 year)</SelectItem>
                              <SelectItem value="intermediate">Intermediate (1-5 years)</SelectItem>
                              <SelectItem value="advanced">Advanced (5+ years)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Investment Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="riskTolerance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Risk Tolerance</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select risk tolerance" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="conservative">Conservative (Low Risk)</SelectItem>
                                <SelectItem value="moderate">Moderate (Medium Risk)</SelectItem>
                                <SelectItem value="aggressive">Aggressive (High Risk)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Your comfort level with investment risk and volatility
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="investmentGoals"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Primary Investment Goal</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select primary goal" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="retirement">Retirement</SelectItem>
                                <SelectItem value="education">Education Funding</SelectItem>
                                <SelectItem value="home">Home Purchase</SelectItem>
                                <SelectItem value="wealth">General Wealth Building</SelectItem>
                                <SelectItem value="income">Generate Income</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              What you're primarily investing for
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="timeHorizon"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Investment Time Horizon</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select time horizon" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="short">Short-term (1-3 years)</SelectItem>
                                <SelectItem value="medium">Medium-term (4-10 years)</SelectItem>
                                <SelectItem value="long">Long-term (10+ years)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How long you plan to hold your investments
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="preferredInvestments"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Preferred Investment Types</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                const currentValues = field.value || [];
                                if (currentValues.includes(value as any)) {
                                  field.onChange(currentValues.filter(v => v !== value));
                                } else {
                                  field.onChange([...currentValues, value as any]);
                                }
                              }} 
                              value=""
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Add investment types" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="stocks">Stocks</SelectItem>
                                <SelectItem value="bonds">Bonds</SelectItem>
                                <SelectItem value="etfs">ETFs</SelectItem>
                                <SelectItem value="mutual_funds">Mutual Funds</SelectItem>
                                <SelectItem value="crypto">Cryptocurrencies</SelectItem>
                                <SelectItem value="real_estate">Real Estate</SelectItem>
                              </SelectContent>
                            </Select>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {field.value?.map((value) => (
                                <div key={value} className="bg-secondary/20 px-2 py-1 rounded-md text-xs flex items-center gap-1">
                                  {value === "stocks" && "Stocks"}
                                  {value === "bonds" && "Bonds"}
                                  {value === "etfs" && "ETFs"}
                                  {value === "mutual_funds" && "Mutual Funds"}
                                  {value === "crypto" && "Cryptocurrencies"}
                                  {value === "real_estate" && "Real Estate"}
                                  <button
                                    type="button"
                                    onClick={() => field.onChange(field.value?.filter(v => v !== value))}
                                    className="text-muted-foreground hover:text-foreground"
                                  >
                                    ✕
                                  </button>
                                </div>
                              ))}
                            </div>
                            <FormDescription>
                              Select the types of investments you're interested in
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="additionalInfo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Information</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any other details about your financial situation or investment preferences..."
                            {...field}
                            rows={4}
                          />
                        </FormControl>
                        <FormDescription>
                          Share any other details that might help us provide better recommendations
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={isSaving} className="w-full">
                    {isSaving ? "Saving..." : "Save Profile"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Learning Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Lessons Completed</p>
                    <div className="flex items-center gap-4">
                      <Progress 
                        value={(learningProgress.lessonsCompleted / learningProgress.totalLessons) * 100} 
                        className="h-2 flex-1" 
                      />
                      <span className="text-sm font-medium">{learningProgress.lessonsCompleted}/{learningProgress.totalLessons}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm font-medium mb-2">Quiz Scores</p>
                    <div className="space-y-3">
                      {learningProgress.quizScores.map((quiz, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <span className="text-sm">{quiz.title}</span>
                          <div className="flex items-center gap-2">
                            <Progress value={quiz.score} className="w-24 h-2" />
                            <span className="text-sm">{quiz.score}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-muted rounded-md">
                    <span className="text-sm font-medium">Current Streak</span>
                    <div className="flex items-center text-amber-500">
                      <span className="text-lg font-bold">{learningProgress.currentStreak}</span>
                      <span className="ml-1 text-sm">days</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/literacy">Continue Learning</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {learningProgress.badges.map((badge, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-md">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                        <CheckCircle className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{badge.name}</p>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="flex items-start gap-3 p-3 border rounded-md border-dashed">
                    <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
                      <TrendingUp className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium">Investment Pro</p>
                      <p className="text-sm text-muted-foreground">Complete 5 lessons to unlock</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Recent Chat History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockChatHistory.length > 0 ? (
                    mockChatHistory.map((chat) => (
                      <div key={chat.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium text-sm">{chat.question}</p>
                          <p className="text-xs text-muted-foreground">{chat.date}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href="/chatbot">View</a>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No chat history yet</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/chatbot">Go to Chatbot</a>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Recent Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecommendations.length > 0 ? (
                    mockRecommendations.map((rec) => (
                      <div key={rec.id} className="flex justify-between items-center py-2 border-b last:border-0">
                        <div>
                          <p className="font-medium text-sm">{rec.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span 
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                rec.riskLevel === "Low" 
                                  ? "bg-green-100 text-green-800" 
                                  : rec.riskLevel === "Medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {rec.riskLevel} Risk
                            </span>
                            <span className="text-xs text-muted-foreground">{rec.date}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href="/recommendations">View</a>
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground">No recommendations yet</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="outline" className="w-full" asChild>
                  <a href="/recommendations">Get Recommendations</a>
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Data & Privacy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                MoneyMentor stores your profile data locally on your device to provide personalized recommendations and track your learning progress.
                No data is sent to external servers without your explicit consent.
              </p>
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  localStorage.removeItem("moneymentor_profile");
                  form.reset(defaultValues);
                  toast({
                    title: "Data Cleared",
                    description: "All your profile data has been removed from this device.",
                  });
                }}>
                  Clear All Data
                </Button>
                <Button variant="outline">Export Data</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
