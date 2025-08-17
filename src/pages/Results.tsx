import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAssessment } from '@/hooks/useAssessment';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  RotateCcw,
  TrendingUp,
  Target,
  BookOpen,
  Award
} from 'lucide-react';

const Results = () => {
  const navigate = useNavigate();
  const { state, calculateResults } = useAssessment();
  
  React.useEffect(() => {
    if (!state.isComplete && state.answers.length === 0) {
      navigate('/');
    }
  }, [state, navigate]);

  const results = calculateResults();

  const getRecommendationIcon = () => {
    switch (results.recommendation) {
      case 'yes':
        return <CheckCircle className="w-8 h-8 text-eco-success" />;
      case 'maybe':
        return <AlertTriangle className="w-8 h-8 text-eco-warning" />;
      case 'no':
        return <XCircle className="w-8 h-8 text-destructive" />;
    }
  };

  const getRecommendationColor = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'text-eco-success';
      case 'maybe':
        return 'text-eco-warning';
      case 'no':
        return 'text-destructive';
    }
  };

  const getRecommendationTitle = () => {
    switch (results.recommendation) {
      case 'yes':
        return 'Highly Recommended';
      case 'maybe':
        return 'Potential with Development';
      case 'no':
        return 'Consider Alternative Paths';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-eco-success';
    if (score >= 40) return 'text-eco-warning';
    return 'text-destructive';
  };

  const formatTime = () => {
    const minutes = Math.round((new Date().getTime() - state.timeStarted.getTime()) / 60000);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8 text-center">
          <h1 className="text-4xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent mb-4">
            Your Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Completed in {formatTime()} • {state.answers.length} questions answered
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Overall Recommendation */}
          <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                {getRecommendationIcon()}
              </div>
              <CardTitle className={`text-2xl ${getRecommendationColor()}`}>
                {getRecommendationTitle()}
              </CardTitle>
              <div className="text-4xl font-bold text-primary mt-2">
                {Math.round(results.overallScore)}%
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground text-lg leading-relaxed">
                {results.feedback}
              </p>
            </CardContent>
          </Card>

          {/* Detailed Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Psychometric Score */}
            <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <span>Psychological Fit</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Interest & Motivation</span>
                    <span className={`font-bold ${getScoreColor(results.psychometricScore)}`}>
                      {Math.round(results.psychometricScore)}%
                    </span>
                  </div>
                  <Progress value={results.psychometricScore} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Measures your natural interest in environmental issues and intrinsic motivation for this career path.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Technical Score */}
            <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <span>Technical Knowledge</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Current Skill Level</span>
                    <span className={`font-bold ${getScoreColor(results.technicalScore)}`}>
                      {Math.round(results.technicalScore)}%
                    </span>
                  </div>
                  <Progress value={results.technicalScore} className="h-3" />
                  <p className="text-sm text-muted-foreground">
                    Evaluates your existing knowledge of environmental science, policy, and analytical tools.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* WISCAR Analysis */}
          <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                <span>WISCAR Professional Readiness</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Object.entries(results.wiscarScores).map(([key, score]) => (
                  <div key={key} className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${getScoreColor(score)}`}>
                      {Math.round(score)}%
                    </div>
                    <div className="text-sm font-medium capitalize text-muted-foreground">
                      {key === 'reality' ? 'Reality Check' : key}
                    </div>
                    <Progress value={score} className="h-2 mt-2" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                WISCAR measures your Will, Interest, Skill, Cognitive readiness, Ability to learn, and Reality alignment with the profession.
              </p>
            </CardContent>
          </Card>

          {/* Learning Path */}
          <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Recommended Learning Path</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {results.suggestedPath.map((step, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-sm leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Gaps */}
          {results.skillGaps.length > 0 && (
            <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
              <CardHeader>
                <CardTitle className="text-lg">Areas for Development</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {results.skillGaps.map((gap, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      {gap}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Take Assessment Again</span>
            </Button>
            
            <Button
              onClick={() => window.print()}
              className="flex items-center space-x-2 bg-[var(--gradient-hero)] hover:opacity-90 transition-all"
            >
              <span>Download Results</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;