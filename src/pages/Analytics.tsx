import { BarChart3, TrendingUp, Users, CheckCircle, Clock, ArrowLeft, Download, Filter, Calendar as CalendarIcon, Target, Zap, Globe, AlertTriangle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area, ComposedChart, Scatter, ScatterChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Progress } from '@/components/ui/progress';

const Analytics = () => {
  const navigate = useNavigate();

  // Enhanced mock data for premium analytics
  const analyticsData = {
    totalTasks: 125,
    completedTasks: 89,
    inProgressTasks: 36,
    totalEmployees: 15,
    averageCompletionTime: '3.2 days',
    productivity: 78,
    efficiency: 92,
    onTimeDelivery: 85,
    customerSatisfaction: 94,
    teamCollaboration: 87,
    burnoutRisk: 23,
    innovationIndex: 76
  };

  const departmentStats = [
    { name: 'Engineering', tasks: 45, completed: 32, percentage: 71, productivity: 85, satisfaction: 92, burnout: 18 },
    { name: 'Design', tasks: 28, completed: 24, percentage: 86, productivity: 90, satisfaction: 88, burnout: 15 },
    { name: 'Marketing', tasks: 22, completed: 18, percentage: 82, productivity: 78, satisfaction: 85, burnout: 25 },
    { name: 'Sales', tasks: 30, completed: 15, percentage: 50, productivity: 65, satisfaction: 79, burnout: 35 }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 12, started: 8, efficiency: 85, collaboration: 78, mood: 82 },
    { day: 'Tue', completed: 15, started: 10, efficiency: 78, collaboration: 85, mood: 79 },
    { day: 'Wed', completed: 18, started: 12, efficiency: 92, collaboration: 88, mood: 91 },
    { day: 'Thu', completed: 14, started: 9, efficiency: 88, collaboration: 82, mood: 86 },
    { day: 'Fri', completed: 16, started: 11, efficiency: 90, collaboration: 89, mood: 94 },
    { day: 'Sat', completed: 8, started: 5, efficiency: 75, collaboration: 65, mood: 77 },
    { day: 'Sun', completed: 6, started: 4, efficiency: 70, collaboration: 58, mood: 73 }
  ];

  const priorityData = [
    { name: 'Critical', value: 15, color: '#dc2626' },
    { name: 'High', value: 35, color: '#ef4444' },
    { name: 'Medium', value: 35, color: '#f59e0b' },
    { name: 'Low', value: 15, color: '#10b981' }
  ];

  const monthlyTrends = [
    { month: 'Jan', tasks: 45, completion: 38, quality: 85, innovation: 72 },
    { month: 'Feb', tasks: 52, completion: 44, quality: 87, innovation: 74 },
    { month: 'Mar', tasks: 48, completion: 41, quality: 89, innovation: 76 },
    { month: 'Apr', tasks: 61, completion: 55, quality: 91, innovation: 78 },
    { month: 'May', tasks: 55, completion: 48, quality: 88, innovation: 75 },
    { month: 'Jun', tasks: 67, completion: 59, quality: 92, innovation: 81 }
  ];

  const predictiveData = [
    { month: 'Jul', predicted: 72, confidence: 85 },
    { month: 'Aug', predicted: 78, confidence: 82 },
    { month: 'Sep', predicted: 74, confidence: 79 },
    { month: 'Oct', predicted: 81, confidence: 88 }
  ];

  const teamPerformance = [
    { name: 'Alice Johnson', productivity: 95, collaboration: 88, innovation: 92, satisfaction: 94 },
    { name: 'Bob Smith', productivity: 87, collaboration: 92, innovation: 78, satisfaction: 89 },
    { name: 'Carol Davis', productivity: 91, collaboration: 85, innovation: 85, satisfaction: 91 },
    { name: 'David Wilson', productivity: 83, collaboration: 89, innovation: 88, satisfaction: 86 },
    { name: 'Eva Brown', productivity: 89, collaboration: 94, innovation: 91, satisfaction: 93 }
  ];

  const skillsData = [
    { skill: 'Technical', A: 85, B: 90, fullMark: 100 },
    { skill: 'Communication', A: 78, B: 85, fullMark: 100 },
    { skill: 'Leadership', A: 82, B: 88, fullMark: 100 },
    { skill: 'Problem Solving', A: 91, B: 87, fullMark: 100 },
    { skill: 'Creativity', A: 76, B: 92, fullMark: 100 },
    { skill: 'Teamwork', A: 88, B: 89, fullMark: 100 }
  ];

  const realTimeMetrics = [
    { label: 'Active Users', value: 12, change: '+2', status: 'up' },
    { label: 'Tasks in Progress', value: 24, change: '-3', status: 'down' },
    { label: 'Avg Response Time', value: '1.2s', change: '-0.3s', status: 'up' },
    { label: 'Server Load', value: '67%', change: '+5%', status: 'stable' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Simplified Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="hover:bg-blue-50 text-blue-600 shadow-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Analytics Hub
                </h1>
              </div>
              <p className="text-slate-600 mt-1">Insights and analytics for your projects</p>
            </div>
          </div>
        </div>

        {/* Real-time Metrics Bar */}
        <Card className="mb-8 bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">LIVE</span>
              </div>
              <div className="grid grid-cols-4 gap-8">
                {realTimeMetrics.map((metric) => (
                  <div key={metric.label} className="text-center">
                    <p className="text-slate-300 text-sm">{metric.label}</p>
                    <div className="flex items-center justify-center gap-2">
                      <p className="text-2xl font-bold">{metric.value}</p>
                      <span className={`text-sm ${metric.status === 'up' ? 'text-green-400' : metric.status === 'down' ? 'text-red-400' : 'text-slate-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold">{analyticsData.totalTasks}</p>
                  <p className="text-blue-100 text-xs mt-1">+12% from last month</p>
                  <Progress value={75} className="mt-2 bg-blue-400" />
                </div>
                <BarChart3 className="h-12 w-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold">{Math.round((analyticsData.completedTasks / analyticsData.totalTasks) * 100)}%</p>
                  <p className="text-green-100 text-xs mt-1">+5% from last week</p>
                  <Progress value={71} className="mt-2 bg-green-400" />
                </div>
                <CheckCircle className="h-12 w-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Team Efficiency</p>
                  <p className="text-3xl font-bold">{analyticsData.efficiency}%</p>
                  <p className="text-purple-100 text-xs mt-1">+8% this quarter</p>
                  <Progress value={92} className="mt-2 bg-purple-400" />
                </div>
                <TrendingUp className="h-12 w-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Innovation Index</p>
                  <p className="text-3xl font-bold">{analyticsData.innovationIndex}%</p>
                  <p className="text-orange-100 text-xs mt-1">Calculated metric</p>
                  <Progress value={76} className="mt-2 bg-orange-400" />
                </div>
                <Target className="h-12 w-12 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Analytics Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Predictive Analytics */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Predictive Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <ComposedChart data={[...monthlyTrends, ...predictiveData]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#3b82f6" name="Historical" />
                  <Line type="monotone" dataKey="predicted" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" name="Predicted" />
                  <Area type="monotone" dataKey="confidence" fill="#8b5cf6" fillOpacity={0.1} name="Confidence" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Team Skills Radar */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                Team Skills Assessment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar name="Team A" dataKey="A" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  <Radar name="Team B" dataKey="B" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Department Performance */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-indigo-600" />
              Advanced Department Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="p-6 border border-slate-200 rounded-xl bg-gradient-to-r from-white to-slate-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-slate-800">{dept.name}</span>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{dept.completed}/{dept.tasks}</Badge>
                      <Badge variant="outline" className={dept.burnout > 30 ? 'text-red-600 border-red-300' : 'text-green-600 border-green-300'}>
                        {dept.burnout > 30 ? <AlertTriangle className="w-3 h-3 mr-1" /> : null}
                        {dept.burnout}% burnout risk
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-slate-600">Completion</p>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.percentage} className="flex-1" />
                        <span className="text-sm font-medium">{dept.percentage}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Productivity</p>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.productivity} className="flex-1" />
                        <span className="text-sm font-medium">{dept.productivity}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Satisfaction</p>
                      <div className="flex items-center gap-2">
                        <Progress value={dept.satisfaction} className="flex-1" />
                        <span className="text-sm font-medium">{dept.satisfaction}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600">Wellbeing</p>
                      <div className="flex items-center gap-2">
                        <Progress value={100 - dept.burnout} className="flex-1" />
                        <span className="text-sm font-medium">{100 - dept.burnout}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team Performance Matrix */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-green-600" />
              Individual Performance Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart data={teamPerformance}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="productivity" name="Productivity" unit="%" />
                <YAxis dataKey="satisfaction" name="Satisfaction" unit="%" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-white p-4 border rounded-lg shadow-lg">
                          <p className="font-semibold">{data.name}</p>
                          <p>Productivity: {data.productivity}%</p>
                          <p>Satisfaction: {data.satisfaction}%</p>
                          <p>Innovation: {data.innovation}%</p>
                          <p>Collaboration: {data.collaboration}%</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Scatter name="Team Members" dataKey="satisfaction" fill="#3b82f6" />
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bottom Section - Quick Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* AI Recommendations */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium text-blue-800">🎯 Focus Area</p>
                  <p className="text-xs text-blue-600 mt-1">Sales team needs productivity support - consider workflow optimization</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-sm font-medium text-green-800">✨ Opportunity</p>
                  <p className="text-xs text-green-600 mt-1">Design team shows high innovation potential - allocate more creative projects</p>
                </div>
                <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <p className="text-sm font-medium text-orange-800">⚠️ Risk Alert</p>
                  <p className="text-xs text-orange-600 mt-1">Monitor Marketing team for burnout indicators</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Global Metrics */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Global Benchmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-700 text-sm">Industry Average</span>
                  <Badge className="bg-blue-100 text-blue-800">68%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-slate-700 text-sm">Your Performance</span>
                  <Badge className="bg-green-500 text-white">92%</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-slate-700 text-sm">Top 10% Companies</span>
                  <Badge className="bg-purple-100 text-purple-800">95%</Badge>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <p className="text-lg font-bold text-orange-600">🏆 Rank #127</p>
                  <p className="text-xs text-orange-600 mt-1">Out of 2,847 companies</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Executive Summary */}
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-600" />
                Executive Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-2xl font-bold text-green-600">A+</p>
                  <p className="text-sm text-green-600">Overall Grade</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">$847K</p>
                  <p className="text-sm text-blue-600">Projected savings</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                  <p className="text-2xl font-bold text-purple-600">127%</p>
                  <p className="text-sm text-purple-600">ROI increase</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
