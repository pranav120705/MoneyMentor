
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-muted py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MoneyMentor</h3>
            <p className="text-sm text-muted-foreground">
              Your smart guide to smarter investing. Simplifying financial decisions with AI.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/chatbot" className="text-sm text-muted-foreground hover:text-primary">AI Chatbot</Link></li>
              <li><Link to="/literacy" className="text-sm text-muted-foreground hover:text-primary">Financial Literacy</Link></li>
              <li><Link to="/recommendations" className="text-sm text-muted-foreground hover:text-primary">Investment Recommendations</Link></li>
              <li><Link to="/insights" className="text-sm text-muted-foreground hover:text-primary">Market Insights</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Investing 101</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Financial Glossary</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Market News</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-primary">Disclaimer</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} MoneyMentor. All rights reserved. Not financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
