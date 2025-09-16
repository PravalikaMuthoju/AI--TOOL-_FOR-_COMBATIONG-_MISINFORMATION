import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  GraduationCap, 
  AlertTriangle, 
  CheckCircle,
  Eye,
  Brain,
  Users,
  BookOpen,
  Target,
  Shield,
  Lightbulb
} from 'lucide-react';

export function Education() {
  const detectionsSignals = [
    {
      title: "Sensational Headlines",
      description: "Look for excessive use of capital letters, emotional language, or phrases like 'SHOCKING' or 'DOCTORS HATE THIS'",
      example: "SHOCKING: This ONE WEIRD TRICK Doctors DON'T Want You to Know!",
      severity: "high"
    },
    {
      title: "Missing Sources",
      description: "Credible information always cites reliable sources. Be wary of claims without proper attribution",
      example: "Studies show that 90% of people agree... (no study mentioned)",
      severity: "high"
    },
    {
      title: "Emotional Manipulation",
      description: "Content designed to trigger strong emotions rather than present facts objectively",
      example: "If you don't share this, you don't care about children's safety!",
      severity: "medium"
    },
    {
      title: "Confirmation Bias Appeal",
      description: "Information that only confirms what you already believe without presenting counterarguments",
      example: "Finally, someone is telling the TRUTH about [your existing belief]",
      severity: "medium"
    },
    {
      title: "Urgency Pressure",
      description: "Creating false urgency to prevent critical thinking and fact-checking",
      example: "Share before they DELETE this! Limited time only!",
      severity: "medium"
    },
    {
      title: "Anonymous Experts",
      description: "Claims attributed to unnamed 'experts', 'studies', or 'doctors' without specifics",
      example: "Leading scientists say..., Top doctors recommend...",
      severity: "low"
    }
  ];

  const verificationSteps = [
    {
      step: 1,
      title: "Check the Source",
      description: "Verify the credibility of the original source. Look for established news organizations, academic institutions, or government agencies.",
      icon: <Eye className="h-6 w-6" />
    },
    {
      step: 2,
      title: "Cross-Reference",
      description: "Look for the same information from multiple reliable sources. If only one source reports it, be skeptical.",
      icon: <Users className="h-6 w-6" />
    },
    {
      step: 3,
      title: "Check the Date",
      description: "Ensure the information is current and hasn't been taken out of context from an older story.",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      step: 4,
      title: "Examine Evidence",
      description: "Look for concrete evidence, data, and expert quotes. Be wary of anecdotal evidence presented as fact.",
      icon: <Target className="h-6 w-6" />
    },
    {
      step: 5,
      title: "Use Fact-Checkers",
      description: "Consult established fact-checking websites like Snopes, PolitiFact, or FactCheck.org.",
      icon: <Shield className="h-6 w-6" />
    },
    {
      step: 6,
      title: "Trust Your Instincts",
      description: "If something seems too good (or bad) to be true, it probably is. Take time to verify before sharing.",
      icon: <Brain className="h-6 w-6" />
    }
  ];

  const commonMisconceptions = [
    {
      misconception: "If it's online, it must be true",
      reality: "Anyone can publish content online without verification. Always check the source and cross-reference."
    },
    {
      misconception: "Shared by many people = must be accurate",
      reality: "Misinformation often spreads faster than facts because it's designed to be engaging and shareable."
    },
    {
      misconception: "Professional-looking websites are always credible",
      reality: "Modern tools make it easy to create professional-looking fake news sites. Check the about page and domain registration."
    },
    {
      misconception: "Videos and images don't lie",
      reality: "Deepfakes, manipulated images, and out-of-context media are increasingly common and sophisticated."
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
          <GraduationCap className="h-8 w-8 text-blue-600" />
          <span>Education Center</span>
        </h1>
        <p className="text-gray-600 mt-2">
          Learn to identify misinformation and become a critical information consumer
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Lessons Completed</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Detection Rate</p>
                <p className="text-2xl font-bold text-green-900">87%</p>
              </div>
              <Target className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Skill Level</p>
                <p className="text-2xl font-bold text-purple-900">Advanced</p>
              </div>
              <Brain className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="signals" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="signals" className="flex items-center space-x-2">
            <AlertTriangle className="h-4 w-4" />
            <span>Warning Signs</span>
          </TabsTrigger>
          <TabsTrigger value="verification" className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4" />
            <span>Verification Steps</span>
          </TabsTrigger>
          <TabsTrigger value="misconceptions" className="flex items-center space-x-2">
            <Lightbulb className="h-4 w-4" />
            <span>Common Myths</span>
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center space-x-2">
            <Target className="h-4 w-4" />
            <span>Practice</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="signals" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <span>Misinformation Warning Signs</span>
              </CardTitle>
              <CardDescription>
                Learn to identify these red flags that indicate potentially false information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {detectionsSignals.map((signal, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{signal.title}</h3>
                        <Badge className={getSeverityColor(signal.severity)}>
                          {signal.severity.toUpperCase()} RISK
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-4">{signal.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <p className="text-sm text-red-700">
                      <strong>Example:</strong> "{signal.example}"
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Verification Process</span>
              </CardTitle>
              <CardDescription>
                Follow these steps to verify information before believing or sharing
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {verificationSteps.map((step) => (
                  <div
                    key={step.step}
                    className="flex items-start space-x-4 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg"
                  >
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border-2 border-blue-200">
                        <span className="text-lg font-bold text-blue-600">{step.step}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-blue-600">{step.icon}</div>
                        <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
                      </div>
                      <p className="text-gray-700">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="misconceptions" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Lightbulb className="h-5 w-5 text-yellow-600" />
                <span>Common Misconceptions</span>
              </CardTitle>
              <CardDescription>
                Debunking widespread myths about information verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {commonMisconceptions.map((item, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-lg"
                >
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-red-700 mb-2">Misconception:</h3>
                        <p className="text-gray-700 italic">"{item.misconception}"</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h3 className="font-semibold text-green-700 mb-2">Reality:</h3>
                        <p className="text-gray-700">{item.reality}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="practice" className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span>Practice Scenarios</span>
              </CardTitle>
              <CardDescription>
                Test your misinformation detection skills with real-world examples
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center py-12 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
                <Target className="mx-auto h-16 w-16 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Interactive Practice Coming Soon</h3>
                <p className="text-gray-600 mb-6">
                  We're building interactive scenarios where you can practice identifying misinformation in realistic contexts.
                </p>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  Join Beta Testing
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-dashed border-purple-300 rounded-lg text-center">
                  <Brain className="mx-auto h-8 w-8 text-purple-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Quick Assessment</h4>
                  <p className="text-sm text-gray-600">Take a quick quiz to test your current detection skills</p>
                </div>
                
                <div className="p-6 border-2 border-dashed border-blue-300 rounded-lg text-center">
                  <Users className="mx-auto h-8 w-8 text-blue-500 mb-3" />
                  <h4 className="font-semibold text-gray-900 mb-2">Community Challenges</h4>
                  <p className="text-sm text-gray-600">Collaborate with others to identify trending misinformation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}