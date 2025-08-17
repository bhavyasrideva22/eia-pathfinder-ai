export interface Question {
  id: string;
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory: string;
  question: string;
  type: 'likert' | 'multiple-choice' | 'boolean';
  options?: string[];
  weight: number;
}

export interface Answer {
  questionId: string;
  value: number | string;
  score: number;
}

export interface AssessmentResult {
  psychometricScore: number;
  technicalScore: number;
  wiscarScores: {
    will: number;
    interest: number;
    skill: number;
    cognitive: number;
    ability: number;
    reality: number;
  };
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  feedback: string;
  suggestedPath: string[];
  skillGaps: string[];
}

export interface AssessmentState {
  currentSection: number;
  currentQuestion: number;
  answers: Answer[];
  timeStarted: Date;
  isComplete: boolean;
}