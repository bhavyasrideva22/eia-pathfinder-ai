import React from 'react';
import { cn } from '@/lib/utils';

interface LikertScaleProps {
  value: number;
  onChange: (value: number) => void;
  className?: string;
}

const labels = [
  'Strongly Disagree',
  'Disagree', 
  'Neutral',
  'Agree',
  'Strongly Agree'
];

export const LikertScale: React.FC<LikertScaleProps> = ({ value, onChange, className }) => {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Strongly Disagree</span>
        <span>Strongly Agree</span>
      </div>
      <div className="flex justify-between items-center space-x-2">
        {[1, 2, 3, 4, 5].map((option) => (
          <label key={option} className="flex flex-col items-center space-y-2 cursor-pointer group">
            <input
              type="radio"
              name="likert"
              value={option}
              checked={value === option}
              onChange={() => onChange(option)}
              className="sr-only"
            />
            <div className={cn(
              "w-8 h-8 rounded-full border-2 transition-all duration-200",
              "flex items-center justify-center",
              "group-hover:scale-110",
              value === option 
                ? "bg-primary border-primary text-primary-foreground"
                : "border-border hover:border-primary bg-background"
            )}>
              <span className="text-sm font-medium">{option}</span>
            </div>
            <span className="text-xs text-center max-w-16 text-muted-foreground">
              {labels[option - 1]}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};