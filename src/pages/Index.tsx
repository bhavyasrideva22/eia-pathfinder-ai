import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Leaf, 
  Target, 
  Brain, 
  BarChart3, 
  Users, 
  ArrowRight,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-6 h-6 text-eco-primary" />,
      title: "Psychometric Analysis",
      description: "Assess your personality fit and intrinsic motivation for environmental work"
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-eco-secondary" />,
      title: "Technical Evaluation", 
      description: "Test your knowledge of environmental science, policy, and analytical tools"
    },
    {
      icon: <Target className="w-6 h-6 text-eco-success" />,
      title: "WISCAR Framework",
      description: "Comprehensive analysis of Will, Interest, Skill, Cognitive readiness, Ability, and Reality"
    }
  ];

  const benefits = [
    "Scientifically validated assessment methodology",
    "Personalized career guidance and learning path",
    "Industry-aligned skill gap analysis", 
    "Professional development recommendations"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-[var(--gradient-hero)] rounded-full shadow-[var(--shadow-elegant)]">
              <Leaf className="w-12 h-12 text-white" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-[var(--gradient-hero)] bg-clip-text text-transparent">
              EIA Pathfinder AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Discover if you're meant to become an <br />
            <span className="font-semibold text-primary">Environmental Impact Assessor</span>
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Clock className="w-4 h-4 mr-2" />
              15-20 minutes
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              Career guidance
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Award className="w-4 h-4 mr-2" />
              Personalized results
            </Badge>
          </div>
          
          <Button
            onClick={() => navigate('/assessment')}
            size="lg"
            className="text-lg px-8 py-4 bg-[var(--gradient-hero)] hover:opacity-90 transition-all transform hover:scale-105 shadow-[var(--shadow-elegant)]"
          >
            Start Assessment
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Comprehensive Career Assessment
          </h2>
          <p className="text-lg text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
            Our AI-powered assessment uses proven psychological frameworks and industry expertise to evaluate your fit for Environmental Impact Assessment careers.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elegant)] transition-all hover:scale-105">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    {feature.icon}
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-[var(--gradient-card)] border-0 shadow-[var(--shadow-card)]">
            <CardHeader>
              <CardTitle className="text-2xl text-center mb-4">
                What You'll Discover
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-eco-success flex-shrink-0 mt-1" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-secondary/30 rounded-lg">
                <h3 className="font-semibold text-lg mb-3">About Environmental Impact Assessment</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Environmental Impact Assessors evaluate the potential environmental consequences of development projects, 
                  ensuring compliance with environmental laws and sustainability goals. This critical role requires a unique 
                  blend of scientific knowledge, analytical skills, and regulatory expertise.
                </p>
              </div>
              
              <div className="text-center mt-8">
                <Button
                  onClick={() => navigate('/assessment')}
                  size="lg"
                  className="bg-[var(--gradient-hero)] hover:opacity-90 transition-all"
                >
                  Begin Your Assessment Journey
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
