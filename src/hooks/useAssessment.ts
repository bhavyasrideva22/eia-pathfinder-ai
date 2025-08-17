import { useState } from 'react';
import { AssessmentState, Answer, AssessmentResult } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export const useAssessment = () => {
  const [state, setState] = useState<AssessmentState>({
    currentSection: 0,
    currentQuestion: 0,
    answers: [],
    timeStarted: new Date(),
    isComplete: false
  });

  const sections = [
    { name: 'Psychometric Assessment', questions: assessmentQuestions.filter(q => q.category === 'psychometric') },
    { name: 'Technical Knowledge', questions: assessmentQuestions.filter(q => q.category === 'technical') },
    { name: 'WISCAR Analysis', questions: assessmentQuestions.filter(q => q.category === 'wiscar') }
  ];

  const currentSectionData = sections[state.currentSection];
  const currentQuestionData = currentSectionData?.questions[state.currentQuestion];
  const progress = ((state.answers.length / assessmentQuestions.length) * 100);

  const addAnswer = (questionId: string, value: number | string) => {
    const question = assessmentQuestions.find(q => q.id === questionId);
    if (!question) return;

    let score = 0;
    if (question.type === 'likert') {
      score = (value as number) * question.weight;
    } else if (question.type === 'multiple-choice') {
      // Calculate score based on correct answers for technical questions
      score = calculateMultipleChoiceScore(questionId, value as number, question.weight);
    }

    const newAnswer: Answer = { questionId, value, score };
    const existingIndex = state.answers.findIndex(a => a.questionId === questionId);
    
    let newAnswers;
    if (existingIndex >= 0) {
      newAnswers = [...state.answers];
      newAnswers[existingIndex] = newAnswer;
    } else {
      newAnswers = [...state.answers, newAnswer];
    }

    setState(prev => ({ ...prev, answers: newAnswers }));
  };

  const calculateMultipleChoiceScore = (questionId: string, answerIndex: number, weight: number): number => {
    // Correct answers for technical questions (0-indexed)
    const correctAnswers: { [key: string]: number } = {
      'tech_1': 0, // Increased soil erosion and flooding risk
      'tech_2': 1, // 25%
      'tech_3': 0, // CO2, CH4, N2O
      'tech_4': 0, // To evaluate potential environmental consequences
      'tech_5': 0, // Spatial analysis and mapping
      'tech_6': 0, // Habitat destruction and fragmentation
      'tech_7': 0, // Impact on marine ecosystems
      'tech_8': 1, // 30%
    };

    // For WISCAR questions, higher option indices generally indicate better scores
    const wiscarScoring: { [key: string]: number[] } = {
      'wiscar_1': [4, 3, 2, 1], // Commitment to unpaid work
      'wiscar_2': [4, 3, 2, 1], // Frequency of engagement
      'wiscar_3': [4, 3, 2, 1], // Skill level
      'wiscar_4': [4, 3, 2, 1], // Systematic thinking
      'wiscar_5': [4, 3, 2, 1], // Learning from criticism
      'wiscar_6': [4, 3, 2, 1], // Work environment preference
      'wiscar_7': [4, 3, 2, 1], // Handling pressure
    };

    if (questionId.startsWith('tech_') && correctAnswers[questionId] !== undefined) {
      return answerIndex === correctAnswers[questionId] ? 5 * weight : 1 * weight;
    } else if (questionId.startsWith('wiscar_') && wiscarScoring[questionId]) {
      return wiscarScoring[questionId][answerIndex] * weight;
    }

    return answerIndex * weight;
  };

  const nextQuestion = () => {
    if (state.currentQuestion < currentSectionData.questions.length - 1) {
      setState(prev => ({ ...prev, currentQuestion: prev.currentQuestion + 1 }));
    } else if (state.currentSection < sections.length - 1) {
      setState(prev => ({ 
        ...prev, 
        currentSection: prev.currentSection + 1,
        currentQuestion: 0
      }));
    } else {
      setState(prev => ({ ...prev, isComplete: true }));
    }
  };

  const previousQuestion = () => {
    if (state.currentQuestion > 0) {
      setState(prev => ({ ...prev, currentQuestion: prev.currentQuestion - 1 }));
    } else if (state.currentSection > 0) {
      const prevSectionLength = sections[state.currentSection - 1].questions.length;
      setState(prev => ({ 
        ...prev, 
        currentSection: prev.currentSection - 1,
        currentQuestion: prevSectionLength - 1
      }));
    }
  };

  const calculateResults = (): AssessmentResult => {
    const psychAnswers = state.answers.filter(a => a.questionId.startsWith('psych_'));
    const techAnswers = state.answers.filter(a => a.questionId.startsWith('tech_'));
    const wiscarAnswers = state.answers.filter(a => a.questionId.startsWith('wiscar_'));

    const psychometricScore = Math.min(100, (psychAnswers.reduce((sum, a) => sum + a.score, 0) / psychAnswers.length) * 20);
    const technicalScore = Math.min(100, (techAnswers.reduce((sum, a) => sum + a.score, 0) / techAnswers.length) * 15);
    
    const wiscarScores = {
      will: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('will')).reduce((sum, a) => sum + a.score, 0) / 2) * 12.5),
      interest: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('interest')).reduce((sum, a) => sum + a.score, 0) / 1) * 25),
      skill: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('skill')).reduce((sum, a) => sum + a.score, 0) / 1) * 25),
      cognitive: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('cognitive')).reduce((sum, a) => sum + a.score, 0) / 1) * 25),
      ability: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('ability')).reduce((sum, a) => sum + a.score, 0) / 1) * 25),
      reality: Math.min(100, (wiscarAnswers.filter(a => a.questionId.includes('reality')).reduce((sum, a) => sum + a.score, 0) / 1) * 25)
    };

    const wiscarAverage = Object.values(wiscarScores).reduce((sum, score) => sum + score, 0) / 6;
    const overallScore = (psychometricScore * 0.3 + technicalScore * 0.4 + wiscarAverage * 0.3);

    let recommendation: 'yes' | 'maybe' | 'no';
    let feedback: string;
    let suggestedPath: string[];
    let skillGaps: string[];

    if (overallScore >= 70) {
      recommendation = 'yes';
      feedback = "Excellent! You show strong potential for a career as an Environmental Impact Assessor. Your combination of interest, technical aptitude, and psychological fit indicates you would thrive in this field.";
      suggestedPath = [
        "Begin with EIA fundamentals and regulatory frameworks",
        "Develop GIS and spatial analysis skills", 
        "Practice with real EIA case studies",
        "Consider formal certification in environmental assessment"
      ];
      skillGaps = technicalScore < 70 ? ["Technical knowledge needs strengthening"] : [];
    } else if (overallScore >= 40) {
      recommendation = 'maybe';
      feedback = "You show potential but would benefit from developing your foundational knowledge and skills before pursuing this career path. Focus on the recommended learning areas.";
      suggestedPath = [
        "Start with environmental science fundamentals",
        "Build basic analytical and technical skills",
        "Gain exposure through volunteering or entry-level positions",
        "Reassess your interest and aptitude after gaining experience"
      ];
      skillGaps = [
        ...(psychometricScore < 50 ? ["Interest and motivation"] : []),
        ...(technicalScore < 50 ? ["Technical knowledge and analytical skills"] : []),
        ...(wiscarAverage < 50 ? ["Professional readiness"] : [])
      ];
    } else {
      recommendation = 'no';
      feedback = "Based on your responses, Environmental Impact Assessment may not be the best career fit for you. Consider exploring related environmental careers that better match your interests and strengths.";
      suggestedPath = [
        "Explore environmental education or outreach roles",
        "Consider environmental policy or communications",
        "Look into sustainability consulting or green business",
        "Investigate conservation or wildlife management"
      ];
      skillGaps = ["Consider alternative environmental career paths"];
    }

    return {
      psychometricScore,
      technicalScore,
      wiscarScores,
      overallScore,
      recommendation,
      feedback,
      suggestedPath,
      skillGaps
    };
  };

  const getCurrentAnswer = () => {
    if (!currentQuestionData) return undefined;
    return state.answers.find(a => a.questionId === currentQuestionData.id);
  };

  return {
    state,
    sections,
    currentSectionData,
    currentQuestionData,
    progress,
    addAnswer,
    nextQuestion,
    previousQuestion,
    calculateResults,
    getCurrentAnswer
  };
};