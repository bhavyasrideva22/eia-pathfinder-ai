import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section (20 questions)
  {
    id: 'psych_1',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I often read about climate-related laws or environmental projects in my free time.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_2',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I find myself drawn to stories about environmental protection and conservation.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_3',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer structured research over creative brainstorming sessions.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_4',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I enjoy analyzing complex systems with multiple interconnected variables.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_5',
    category: 'psychometric',
    subcategory: 'cognitive',
    question: 'I naturally notice small details that others might miss.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_6',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I would take a lower-paying job if it helped protect ecosystems.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_7',
    category: 'psychometric',
    subcategory: 'learning',
    question: 'When I fail at something technical, I try again until I understand it.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_8',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'I prefer following established procedures rather than improvising.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_9',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'I actively seek out documentaries about environmental issues.',
    type: 'likert',
    weight: 1
  },
  {
    id: 'psych_10',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'Making a positive environmental impact motivates me more than career advancement.',
    type: 'likert',
    weight: 1
  },

  // Technical Section (15 questions)
  {
    id: 'tech_1',
    category: 'technical',
    subcategory: 'logical',
    question: 'If forest cover decreases in a watershed, which outcome is most likely?',
    type: 'multiple-choice',
    options: [
      'Increased soil erosion and flooding risk',
      'Improved agricultural productivity', 
      'Better air quality in cities',
      'Reduced wildlife diversity only'
    ],
    weight: 1.5
  },
  {
    id: 'tech_2',
    category: 'technical',
    subcategory: 'numerical',
    question: 'Pollution levels dropped from 180 ppm to 135 ppm. What is the percentage decrease?',
    type: 'multiple-choice',
    options: ['20%', '25%', '30%', '35%'],
    weight: 1.5
  },
  {
    id: 'tech_3',
    category: 'technical',
    subcategory: 'scientific',
    question: 'Which of these are primary greenhouse gases?',
    type: 'multiple-choice',
    options: [
      'CO2, CH4, N2O',
      'O2, N2, Ar', 
      'SO2, NO2, CO',
      'H2, He, Ne'
    ],
    weight: 1.5
  },
  {
    id: 'tech_4',
    category: 'technical',
    subcategory: 'policy',
    question: 'What is the primary purpose of an Environmental Impact Assessment?',
    type: 'multiple-choice',
    options: [
      'To evaluate potential environmental consequences before project approval',
      'To monitor pollution after project completion',
      'To calculate project costs and benefits',
      'To design environmental restoration plans'
    ],
    weight: 2
  },
  {
    id: 'tech_5',
    category: 'technical',
    subcategory: 'tools',
    question: 'GIS (Geographic Information Systems) in environmental assessment is primarily used for:',
    type: 'multiple-choice',
    options: [
      'Spatial analysis and mapping environmental data',
      'Financial modeling and cost analysis',
      'Writing technical reports',
      'Conducting stakeholder interviews'
    ],
    weight: 1.5
  },
  {
    id: 'tech_6',
    category: 'technical',
    subcategory: 'scientific',
    question: 'Biodiversity loss is primarily caused by:',
    type: 'multiple-choice',
    options: [
      'Habitat destruction and fragmentation',
      'Natural evolutionary processes',
      'Volcanic activity',
      'Solar radiation changes'
    ],
    weight: 1.5
  },
  {
    id: 'tech_7',
    category: 'technical',
    subcategory: 'logical',
    question: 'In a coastal development project, the most critical environmental factor to assess would be:',
    type: 'multiple-choice',
    options: [
      'Impact on marine ecosystems and coastal erosion',
      'Noise pollution only',
      'Traffic congestion',
      'Building aesthetics'
    ],
    weight: 2
  },
  {
    id: 'tech_8',
    category: 'technical',
    subcategory: 'numerical',
    question: 'A factory emits 500 tons of CO2 annually. After efficiency improvements, emissions drop to 350 tons. What is the reduction rate?',
    type: 'multiple-choice',
    options: ['25%', '30%', '35%', '40%'],
    weight: 1.5
  },

  // WISCAR Section (15 questions)
  {
    id: 'wiscar_1',
    category: 'wiscar',
    subcategory: 'will',
    question: 'Would you commit to completing a 3-month unpaid environmental field research project?',
    type: 'multiple-choice',
    options: [
      'Definitely, if it advances environmental protection',
      'Probably, depending on the specific project',
      'Maybe, if I had no other commitments',
      'Unlikely, I need paid work'
    ],
    weight: 2
  },
  {
    id: 'wiscar_2',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'How often do you engage in environmental discussions or events?',
    type: 'multiple-choice',
    options: [
      'Weekly or more',
      'Monthly',
      'A few times per year',
      'Rarely or never'
    ],
    weight: 1.5
  },
  {
    id: 'wiscar_3',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'Rate your current skill level with data analysis tools (Excel, statistical software):',
    type: 'multiple-choice',
    options: [
      'Advanced - I can perform complex analyses',
      'Intermediate - I can handle most basic tasks',
      'Beginner - I know the basics',
      'None - I have no experience'
    ],
    weight: 2
  },
  {
    id: 'wiscar_4',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'A mining project is proposed near a protected wetland. Your immediate concern would be:',
    type: 'multiple-choice',
    options: [
      'Systematic assessment of all potential ecosystem impacts',
      'Economic benefits vs environmental costs',
      'Public opinion and media coverage',
      'Legal compliance requirements only'
    ],
    weight: 2
  },
  {
    id: 'wiscar_5',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'When you receive constructive criticism on your work, you typically:',
    type: 'multiple-choice',
    options: [
      'Appreciate it and use it to improve immediately',
      'Consider it carefully before making changes',
      'Feel defensive but eventually accept it',
      'Find it difficult to accept or implement'
    ],
    weight: 1.5
  },
  {
    id: 'wiscar_6',
    category: 'wiscar',
    subcategory: 'reality',
    question: 'Which best describes your ideal work environment?',
    type: 'multiple-choice',
    options: [
      'Mix of office analysis and field work',
      'Primarily office-based research',
      'Mostly outdoor fieldwork',
      'Remote work with minimal travel'
    ],
    weight: 1.5
  },
  {
    id: 'wiscar_7',
    category: 'wiscar',
    subcategory: 'will',
    question: 'Environmental assessment work often involves tight deadlines and regulatory pressure. This:',
    type: 'multiple-choice',
    options: [
      'Motivates me to do my best work',
      'Is manageable with good organization',
      'Would stress me but I could handle it',
      'Sounds overwhelming and unappealing'
    ],
    weight: 2
  }
];