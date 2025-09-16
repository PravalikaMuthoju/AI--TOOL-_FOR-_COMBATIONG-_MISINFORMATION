import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  BarChart3,
  Calendar,
  Globe,
  Users,
  Activity
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

export function Trends() {
  // Mock data for trending misinformation
  const trendingMisinformation = [
    { 
      id: 1,
      claim: "5G towers cause health problems and spread viruses",
      category: "Health",
      checks: 1247,
      trend: "up",
      trendValue: 23,
      falseProbability: 95,
      regions: ["North America", "Europe", "Asia"]
    },
    { 
      id: 2,
      claim: "Miracle supplement cures diabetes without medication",
      category: "Health",
      checks: 892,
      trend: "up",
      trendValue: 18,
      falseProbability: 98,
      regions: ["Global"]
    },
    { 
      id: 3,
      claim: "Government secretly controlling weather patterns",
      category: "Conspiracy",
      checks: 634,
      trend: "down",
      trendValue: -12,
      falseProbability: 89,
      regions: ["North America", "Australia"]
    },
    { 
      id: 4,
      claim: "Cryptocurrency investment guarantees 1000% returns",
      category: "Finance",
      checks: 578,
      trend: "up",
      trendValue: 34,
      falseProbability: 99,
      regions: ["Global"]
    },
    { 
      id: 5,
      claim: "Vaccines contain microchips for tracking",
      category: "Health",
      checks: 445,
      trend: "down",
      trendValue: -8,
      falseProbability: 97,
      regions: ["North America", "Europe"]
    }
  ];

  // Mock data for weekly trends
  const weeklyData = [
    { day: 'Mon', misinformation: 45, verified: 234 },
    { day: 'Tue', misinformation: 52, verified: 267 },
    { day: 'Wed', misinformation: 78, verified: 189 },
    { day: 'Thu', misinformation: 34, verified: 298 },
    { day: 'Fri', misinformation: 67, verified: 245 },
    { day: 'Sat', misinformation: 89, verified: 176 },
    { day: 'Sun', misinformation: 56, verified: 203 },
  ];

  // Mock data for category breakdown
  const categoryData = [
    { name: 'Health', value: 35, count: 1247 },
    { name: 'Politics', value: 28, count: 892 },
    { name: 'Finance', value: 20, count: 634 },
    { name: 'Technology', value: 10, count: 445 },
    { name: 'Science', value: 7, count: 289 },
  ];

  const COLORS = ['#EF4444', '#F97316', '#EAB308', '#22C55E', '#3B82F6'];

  const getTrendIcon = (trend: string, value: number) => {
    if (trend === 'up') {
      return <TrendingUp className="h-4 w-4 text-red-500" />;
    }
    return <TrendingDown className="h-4 w-4 text-green-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-red-600' : 'text-green-600';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Misinformation Trends</h1>
        <p className="text-gray-600 mt-2">
          Monitor global patterns and emerging misinformation threats
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Threats</p>
                <p className="text-2xl font-bold text-red-600">47</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Global Checks</p>
                <p className="text-2xl font-bold text-blue-600">12.4K</p>
              </div>
              <Globe className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Weekly Growth</p>
                <p className="text-2xl font-bold text-orange-600">+23%</p>
              </div>
              <Activity className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Users Protected</p>
                <p className="text-2xl font-bold text-green-600">89.2K</p>
              </div>
              <Users className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Trend Chart */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Weekly Detection Trends</span>
            </CardTitle>
            <CardDescription>
              Misinformation vs verified content over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="misinformation" 
                  stroke="#EF4444" 
                  strokeWidth={3}
                  name="Misinformation"
                />
                <Line 
                  type="monotone" 
                  dataKey="verified" 
                  stroke="#22C55E" 
                  strokeWidth={3}
                  name="Verified"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>
              Distribution of misinformation by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trending Misinformation */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Top Misinformation Trends</span>
          </CardTitle>
          <CardDescription>
            Most detected false claims and their spread patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trending" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="trending">Trending Now</TabsTrigger>
              <TabsTrigger value="regional">By Region</TabsTrigger>
              <TabsTrigger value="category">By Category</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trending" className="space-y-4">
              {trendingMisinformation.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center space-x-3">
                      <Badge className="bg-red-100 text-red-800">
                        #{index + 1}
                      </Badge>
                      <Badge variant="outline">{item.category}</Badge>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(item.trend, item.trendValue)}
                        <span className={`text-sm font-medium ${getTrendColor(item.trend)}`}>
                          {item.trendValue > 0 ? '+' : ''}{item.trendValue}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-900 font-medium leading-relaxed">
                      {item.claim}
                    </p>
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>{item.checks.toLocaleString()} checks</span>
                      <span>{item.falseProbability}% confidence false</span>
                      <div className="flex items-center space-x-1">
                        <Globe className="h-4 w-4" />
                        <span>{item.regions.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right ml-6">
                    <div className="text-2xl font-bold text-red-600">
                      {item.falseProbability}%
                    </div>
                    <p className="text-sm text-gray-500">False Confidence</p>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-4">
              <div className="text-center py-12 text-gray-500">
                <Globe className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <p>Regional analysis would show geographic distribution of misinformation</p>
                <p className="text-sm">Interactive map coming soon</p>
              </div>
            </TabsContent>
            
            <TabsContent value="category" className="space-y-4">
              <div className="grid gap-4">
                {categoryData.map((category, index) => (
                  <div key={category.name} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-500">{category.count} total checks</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{category.value}%</p>
                      <p className="text-sm text-gray-500">of total</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}