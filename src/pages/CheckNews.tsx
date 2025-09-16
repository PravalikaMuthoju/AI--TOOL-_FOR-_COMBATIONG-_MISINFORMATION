import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Link as LinkIcon, 
  Image, 
  Shield,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useToast } from '@/hooks/use-toast';

interface FactCheckResult {
  truthScore: number;
  explanation: string;
  sources: Array<{ title: string; url: string; reliability: string }>;
  category: string;
  confidence: string;
}

export function CheckNews() {
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const { toast } = useToast();

  // Mock fact-checking function (in real app, this would call your AI API)
  const performFactCheck = async (content: string, type: 'text' | 'url' | 'image'): Promise<FactCheckResult> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock response based on content
    const isSuspicious = content.toLowerCase().includes('miracle') || 
                        content.toLowerCase().includes('guaranteed') ||
                        content.toLowerCase().includes('secret') ||
                        content.toLowerCase().includes('doctors hate');
    
    return {
      truthScore: isSuspicious ? Math.floor(Math.random() * 30) + 10 : Math.floor(Math.random() * 20) + 75,
      explanation: isSuspicious 
        ? "This content contains multiple red flags commonly associated with misinformation, including sensational claims without credible sources and language designed to bypass critical thinking."
        : "This content appears to be factually accurate based on cross-reference with trusted sources and lack of misleading indicators.",
      sources: [
        { title: "Reuters Fact Check", url: "https://reuters.com", reliability: "High" },
        { title: "Snopes Verification", url: "https://snopes.com", reliability: "High" },
        { title: "Associated Press News", url: "https://apnews.com", reliability: "High" }
      ],
      category: isSuspicious ? "Health Misinformation" : "Verified News",
      confidence: isSuspicious ? "High Confidence - False" : "High Confidence - True"
    };
  };

  const handleCheck = async (content: string, type: 'text' | 'url' | 'image') => {
    if (!content.trim()) {
      toast({
        title: "No content provided",
        description: "Please enter some content to fact-check.",
        variant: "destructive",
      });
      return;
    }

    setChecking(true);
    setResult(null);

    try {
      const factCheckResult = await performFactCheck(content, type);
      setResult(factCheckResult);
      
      toast({
        title: "Fact-check completed",
        description: `Truth score: ${factCheckResult.truthScore}%`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to perform fact-check. Please try again.",
        variant: "destructive",
      });
    } finally {
      setChecking(false);
    }
  };

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      toast({
        title: "Image uploaded",
        description: `Processing ${file.name}...`,
      });
      handleCheck(`Image analysis of ${file.name}`, 'image');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    },
    maxFiles: 1
  });

  const getTruthScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTruthScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle className="h-6 w-6 text-green-600" />;
    if (score >= 40) return <Shield className="h-6 w-6 text-yellow-600" />;
    return <AlertTriangle className="h-6 w-6 text-red-600" />;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Fact-Check Content</h1>
        <p className="text-gray-600 mt-2">
          Submit text, URLs, or images to verify their authenticity using AI-powered analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Submit Content for Analysis</CardTitle>
            <CardDescription>
              Choose your preferred input method below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="text" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center space-x-2">
                  <Search className="h-4 w-4" />
                  <span>Text</span>
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center space-x-2">
                  <LinkIcon className="h-4 w-4" />
                  <span>URL</span>
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center space-x-2">
                  <Image className="h-4 w-4" />
                  <span>Image</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="text" className="space-y-4">
                <div>
                  <Label htmlFor="text-content">Paste your content</Label>
                  <Textarea
                    id="text-content"
                    placeholder="Paste the news article, social media post, or any text content you want to verify..."
                    className="min-h-[200px]"
                    value={textContent}
                    onChange={(e) => setTextContent(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleCheck(textContent, 'text')}
                  disabled={checking}
                  className="w-full"
                >
                  {checking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Fact-Check Text
                    </>
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="url" className="space-y-4">
                <div>
                  <Label htmlFor="url-content">Enter URL</Label>
                  <Input
                    id="url-content"
                    placeholder="https://example.com/article"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={() => handleCheck(urlContent, 'url')}
                  disabled={checking}
                  className="w-full"
                >
                  {checking ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Fact-Check URL
                    </>
                  )}
                </Button>
              </TabsContent>
              
              <TabsContent value="image" className="space-y-4">
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    isDragActive 
                      ? 'border-blue-400 bg-blue-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input {...getInputProps()} />
                  <Image className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  {isDragActive ? (
                    <p className="text-blue-600">Drop the image here...</p>
                  ) : (
                    <div>
                      <p className="text-gray-600 mb-2">
                        Drag & drop an image here, or click to select
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPEG, PNG, GIF formats
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Analysis Results</span>
            </CardTitle>
            <CardDescription>
              AI-powered fact-checking results will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            {checking ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center p-8">
                  <div className="text-center space-y-4">
                    <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
                    <p className="text-gray-600">Analyzing content with AI...</p>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Cross-referencing with trusted sources</p>
                      <Progress value={33} className="w-64" />
                    </div>
                  </div>
                </div>
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Truth Score */}
                <div className="text-center p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                  <div className="flex items-center justify-center space-x-3 mb-2">
                    {getTruthScoreIcon(result.truthScore)}
                    <span className={`text-3xl font-bold ${getTruthScoreColor(result.truthScore)}`}>
                      {result.truthScore}%
                    </span>
                  </div>
                  <p className="text-lg font-medium text-gray-900 mb-1">Truth Score</p>
                  <Badge variant={result.truthScore >= 70 ? "default" : "destructive"}>
                    {result.confidence}
                  </Badge>
                </div>

                {/* Category */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Category</Label>
                  <p className="mt-1 text-sm text-gray-900">{result.category}</p>
                </div>

                {/* Explanation */}
                <div>
                  <Label className="text-sm font-medium text-gray-700">Analysis</Label>
                  <p className="mt-2 text-sm text-gray-900 leading-relaxed">
                    {result.explanation}
                  </p>
                </div>

                {/* Verified Sources */}
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-3 block">Verified Sources</Label>
                  <div className="space-y-2">
                    {result.sources.map((source, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{source.title}</p>
                          <p className="text-sm text-gray-600">Reliability: {source.reliability}</p>
                        </div>
                        <Button variant="ghost" size="sm" asChild>
                          <a href={source.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-gray-500">
                <Shield className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>Submit content above to see analysis results</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}