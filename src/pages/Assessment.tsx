import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { LikertScale } from '@/components/ui/likert-scale';
import { useAssessment } from '@/hooks/useAssessment';
import { assessmentQuestions } from '@/data/questions';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const Assessment = () => {
  const navigate = useNavigate();
  const {
    state,
    currentSectionData,
    currentQuestionData,
    progress,
    addAnswer,
    nextQuestion,
    previousQuestion,
    getCurrentAnswer
  } = useAssessment();

  const currentAnswer = getCurrentAnswer();
  const canProceed = currentAnswer !== undefined;

  const handleAnswerChange = (value: number | string) => {
    if (currentQuestionData) {
      addAnswer(currentQuestionData.id, value);
    }
  };

  const handleNext = () => {
    if (state.isComplete) {
      navigate('/results');
    } else {
      nextQuestion();
    }
  };

  const handlePrevious = () => {
    if (state.currentSection === 0 && state.currentQuestion === 0) {
      navigate('/');
    } else {
      previousQuestion();
    }
  };

  if (state.isComplete) {
    navigate('/results');
    return null;
  }

  if (!currentQuestionData || !currentSectionData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading Assessment...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              EIA Pathfinder Assessment
            </h1>
            <div className="text-sm text-muted-foreground">
              Question {state.answers.length + 1} of {assessmentQuestions.length}
            </div>
          </div>
          
          <Progress value={progress} className="h-2 mb-4" />
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>{currentSectionData.name}</span>
            </span>
            <span>•</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-xl leading-relaxed">
                {currentQuestionData.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentQuestionData.type === 'likert' && (
                <LikertScale
                  value={currentAnswer?.value as number || 0}
                  onChange={handleAnswerChange}
                />
              )}
              
              {currentQuestionData.type === 'multiple-choice' && (
                <div className="space-y-3">
                  {currentQuestionData.options?.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-start space-x-3 p-4 rounded-lg border cursor-pointer transition-all hover:bg-secondary/30 hover:border-primary/30"
                    >
                      <input
                        type="radio"
                        name="multiple-choice"
                        value={index}
                        checked={currentAnswer?.value === index}
                        onChange={() => handleAnswerChange(index)}
                        className="mt-1 text-primary focus:ring-primary"
                      />
                      <span className="text-sm leading-relaxed">{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="flex items-center space-x-2 bg-[var(--gradient-hero)] hover:opacity-90 transition-all"
            >
              <span>{state.isComplete ? 'View Results' : 'Next'}</span>
              {state.isComplete ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;