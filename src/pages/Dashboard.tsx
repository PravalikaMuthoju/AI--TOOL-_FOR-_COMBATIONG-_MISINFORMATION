import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  FileText, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export function Dashboard() {
  const stats = [
    { label: 'Total Checks', value: '1,247', icon: Search, color: 'text-blue-600' },
    { label: 'Misinformation Detected', value: '89', icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Verified True', value: '1,158', icon: CheckCircle, color: 'text-green-600' },
    { label: 'Accuracy Rate', value: '94.8%', icon: Shield, color: 'text-purple-600' },
  ];

  const recentChecks = [
    { 
      content: "Breaking: New vaccine side effects discovered...", 
      score: 23, 
      status: "False", 
      time: "2 hours ago",
      category: "Health"
    },
    { 
      content: "Local election results show unexpected winner...", 
      score: 87, 
      status: "True", 
      time: "4 hours ago",
      category: "Politics"
    },
    { 
      content: "Cryptocurrency investment guaranteed returns...", 
      score: 15, 
      status: "False", 
      time: "6 hours ago",
      category: "Finance"
    },
  ];

  const trendingMisinformation = [
    { claim: "5G towers cause health issues", checks: 234, trend: "up" },
    { claim: "Miracle cure for diabetes discovered", checks: 189, trend: "up" },
    { claim: "Election was rigged by foreign powers", checks: 156, trend: "down" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Monitor misinformation trends and track your fact-checking activity
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="h-5 w-5" />
              <span>Quick Actions</span>
            </CardTitle>
            <CardDescription>
              Start fact-checking content or explore insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link to="/check">
              <Button className="w-full justify-start" size="lg">
                <Search className="h-4 w-4 mr-2" />
                Check News Content
              </Button>
            </Link>
            <Link to="/trends">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Trends
              </Button>
            </Link>
            <Link to="/reports">
              <Button variant="outline" className="w-full justify-start" size="lg">
                <FileText className="h-4 w-4 mr-2" />
                My Reports
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Checks */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Recent Checks</span>
            </CardTitle>
            <CardDescription>
              Your latest fact-checking activity
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentChecks.map((check, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900 line-clamp-2 flex-1">
                    {check.content}
                  </p>
                  <Badge 
                    variant={check.status === 'True' ? 'default' : 'destructive'}
                    className="ml-2 shrink-0"
                  >
                    {check.score}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{check.category}</span>
                  <span>{check.time}</span>
                </div>
                {index < recentChecks.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Trending Misinformation */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Trending Misinformation</span>
            </CardTitle>
            <CardDescription>
              Most checked false claims this week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {trendingMisinformation.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-start justify-between">
                  <p className="text-sm text-gray-900 flex-1">{item.claim}</p>
                  <div className="flex items-center space-x-1 ml-2">
                    <TrendingUp className={`h-3 w-3 ${item.trend === 'up' ? 'text-red-500' : 'text-green-500'}`} />
                    <span className="text-xs text-gray-500">{item.checks}</span>
                  </div>
                </div>
                {index < trendingMisinformation.length - 1 && (
                  <hr className="border-gray-100" />
                )}
              </div>
            ))}
            <Link to="/trends">
              <Button variant="outline" size="sm" className="w-full mt-4">
                View All Trends
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}