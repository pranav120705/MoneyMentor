import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import FeatureCard from "@/components/FeatureCard";
import { MessageSquare, BookOpen, TrendingUp, LineChart, User } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="space-y-16 pb-8">
      {/* Hero Section */}
      <motion.section
        className="text-center py-16 px-6 bg-gradient-to-r from-[#2a2a2a] via-[#383838] to-[#4f4f4f] rounded-lg shadow-xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-6 hover:text-primary transition-all duration-300"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          Your Smart Guide to <span className="text-primary">Smarter Investing</span>
        </motion.h1>
        <motion.p
          className="text-xl text-gray-200 max-w-3xl mx-auto mb-10 opacity-80 hover:opacity-100 transition-all duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          MoneyMentor combines AI-powered advice, educational content, and market insights to help you make confident financial decisions.
        </motion.p>
        <div className="flex flex-wrap justify-center gap-6">
          <Button
            asChild
            size="lg"
            className="text-lg px-10 py-3 bg-primary hover:bg-primary-dark transition duration-300 rounded-full shadow-xl transform hover:scale-105"
          >
            <Link to="/chatbot">Ask MoneyMentor</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg px-10 py-3 bg-primary hover:bg-primary-dark transition duration-300 rounded-full shadow-xl transform hover:scale-105"
          >
            <Link to="/literacy">Start Learning</Link>
          </Button>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-12 bg-gradient-to-r from-[#F0F1F6] via-[#e0e0e0] to-[#d1d1d1] rounded-lg shadow-xl p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-12 text-gray-900">How MoneyMentor Helps You</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <FeatureCard
            title="AI Financial Assistant"
            description="Ask any financial or investment question and get clear, jargon-free explanations."
            icon={<MessageSquare className="h-8 w-8 text-primary" />}
            to="/chatbot"
          />
          <FeatureCard
            title="Financial Literacy"
            description="Learn investing basics through bite-sized lessons and interactive quizzes."
            icon={<BookOpen className="h-8 w-8 text-primary" />}
            to="/literacy"
          />
          <FeatureCard
            title="Investment Recommendations"
            description="Get personalized investment suggestions based on your profile and goals."
            icon={<TrendingUp className="h-8 w-8 text-primary" />}
            to="/recommendations"
          />
          <FeatureCard
            title="Market Insights"
            description="Visualize market trends and data with easy-to-understand charts."
            icon={<LineChart className="h-8 w-8 text-primary" />}
            to="/insights"
          />
          <FeatureCard
            title="Personalized Profile"
            description="Customize your experience and track your financial learning journey."
            icon={<User className="h-8 w-8 text-primary" />}
            to="/profile"
          />
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="py-12 bg-gradient-to-br from-[#3b3b3b] via-[#2c2c2c] to-[#1b1b1b] rounded-lg p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <h2 className="text-3xl font-extrabold text-center mb-12 text-white">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Create Your Profile</h3>
            <p className="text-gray-200">Tell us about your financial goals, risk tolerance, and investment horizon.</p>
          </motion.div>
          <motion.div
            className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Explore and Learn</h3>
            <p className="text-gray-200">Use our chatbot, complete lessons, and view market insights to boost your knowledge.</p>
          </motion.div>
          <motion.div
            className="text-center bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="bg-primary/10 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-primary text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Get Recommendations</h3>
            <p className="text-gray-200">Receive personalized investment ideas tailored to your unique situation.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Call to Action Section */}
      <motion.section
        className="text-center py-16 bg-gradient-to-r from-black via-gray-800 to-blue-600 rounded-lg shadow-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="p-8 max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight">
            Ready to Start Your Investment Journey?
          </h2>
          <p className="text-lg text-white mb-8 max-w-2xl mx-auto opacity-80">
            MoneyMentor is here to guide you every step of the way with AI-powered insights and jargon-free advice. 
            Start making informed financial decisions today!
          </p>
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            <Link to="/chatbot">Ask Your First Question</Link>
          </Button>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;


