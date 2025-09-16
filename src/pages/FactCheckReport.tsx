import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Calendar,
  Filter,
  Download,
  CheckCircle,
  AlertTriangle,
  Shield,
  Clock
} from 'lucide-react';

interface FactCheckRecord {
  id: string;
  content: string;
  type: 'text' | 'url' | 'image';
  truthScore: number;
  category: string;
  status: 'verified' | 'false' | 'uncertain';
  timestamp: string;
  sources: number;
}

export function FactCheckReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  // Mock data - in real app, this would come from your database
  const mockReports: FactCheckRecord[] = [
    {
      id: '1',
      content: 'Breaking news about new medical breakthrough that doctors don\'t want you to know...',
      type: 'text',
      truthScore: 15,
      category: 'Health',
      status: 'false',
      timestamp: '2024-01-15T10:30:00Z',
      sources: 3
    },
    {
      id: '2',
      content: 'Local election results confirm official winner with 65% of votes...',
      type: 'url',
      truthScore: 92,
      category: 'Politics',
      status: 'verified',
      timestamp: '2024-01-15T09:15:00Z',
      sources: 5
    },
    {
      id: '3',
      content: 'Scientific study shows climate change effects accelerating faster than predicted...',
      type: 'text',
      truthScore: 88,
      category: 'Science',
      status: 'verified',
      timestamp: '2024-01-14T16:45:00Z',
      sources: 4
    },
    {
      id: '4',
      content: 'Cryptocurrency investment scheme promises 500% returns guaranteed...',
      type: 'text',
      truthScore: 8,
      category: 'Finance',
      status: 'false',
      timestamp: '2024-01-14T14:20:00Z',
      sources: 2
    },
    {
      id: '5',
      content: 'Weather forecast indicates severe storm approaching coastal areas...',
      type: 'url',
      truthScore: 95,
      category: 'Weather',
      status: 'verified',
      timestamp: '2024-01-14T12:00:00Z',
      sources: 3
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'false':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Shield className="h-4 w-4 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800';
      case 'false':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getTruthScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const filteredReports = mockReports
    .filter(report => {
      if (activeTab === 'verified') return report.status === 'verified';
      if (activeTab === 'false') return report.status === 'false';
      if (activeTab === 'uncertain') return report.status === 'uncertain';
      return true;
    })
    .filter(report => 
      report.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fact-Check Reports</h1>
          <p className="text-gray-600 mt-2">
            View and manage your fact-checking history
          </p>
        </div>
        <Button className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Reports</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Checks</p>
                <p className="text-2xl font-bold text-gray-900">{mockReports.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-green-600">
                  {mockReports.filter(r => r.status === 'verified').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">False Claims</p>
                <p className="text-2xl font-bold text-red-600">
                  {mockReports.filter(r => r.status === 'false').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Score</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(mockReports.reduce((acc, r) => acc + r.truthScore, 0) / mockReports.length)}%
                </p>
              </div>
              <Shield className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Section */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Your Reports</CardTitle>
              <CardDescription>
                Browse and filter your fact-checking history
              </CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reports..."
                  className="pl-10 w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All ({mockReports.length})</TabsTrigger>
              <TabsTrigger value="verified" className="text-green-700">
                Verified ({mockReports.filter(r => r.status === 'verified').length})
              </TabsTrigger>
              <TabsTrigger value="false" className="text-red-700">
                False ({mockReports.filter(r => r.status === 'false').length})
              </TabsTrigger>
              <TabsTrigger value="uncertain" className="text-yellow-700">
                Uncertain ({mockReports.filter(r => r.status === 'uncertain').length})
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(report.status)}
                          <Badge className={getStatusColor(report.status)}>
                            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                          </Badge>
                          <Badge variant="outline">{report.category}</Badge>
                          <Badge variant="outline" className="capitalize">
                            {report.type}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-900 leading-relaxed line-clamp-2">
                          {report.content}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{formatTimestamp(report.timestamp)}</span>
                          </div>
                          <span>{report.sources} sources verified</span>
                        </div>
                      </div>
                      
                      <div className="text-right ml-6">
                        <div className={`text-2xl font-bold ${getTruthScoreColor(report.truthScore)}`}>
                          {report.truthScore}%
                        </div>
                        <p className="text-sm text-gray-500">Truth Score</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {filteredReports.length === 0 && (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p>No reports found matching your criteria</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}