
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  to: string;
  className?: string;
}

const FeatureCard = ({ title, description, icon, to, className }: FeatureCardProps) => {
  return (
    <Card className={cn("h-full flex flex-col transition-transform hover:scale-105", className)}>
      <CardHeader>
        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Optional content can go here */}
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <Link to={to}>Explore Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FeatureCard;
