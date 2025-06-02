
import { BarChart3, TrendingUp, Users, CheckCircle, Clock, ArrowLeft, Download, Filter, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const Analytics = () => {
  const navigate = useNavigate();

  // Mock data for demonstration
  const analyticsData = {
    totalTasks: 125,
    completedTasks: 89,
    inProgressTasks: 36,
    totalEmployees: 15,
    averageCompletionTime: '3.2 days',
    productivity: 78,
    efficiency: 92,
    onTimeDelivery: 85
  };

  const departmentStats = [
    { name: 'Engineering', tasks: 45, completed: 32, percentage: 71, productivity: 85 },
    { name: 'Design', tasks: 28, completed: 24, percentage: 86, productivity: 90 },
    { name: 'Marketing', tasks: 22, completed: 18, percentage: 82, productivity: 78 },
    { name: 'Sales', tasks: 30, completed: 15, percentage: 50, productivity: 65 }
  ];

  const weeklyData = [
    { day: 'Mon', completed: 12, started: 8, efficiency: 85 },
    { day: 'Tue', completed: 15, started: 10, efficiency: 78 },
    { day: 'Wed', completed: 18, started: 12, efficiency: 92 },
    { day: 'Thu', completed: 14, started: 9, efficiency: 88 },
    { day: 'Fri', completed: 16, started: 11, efficiency: 90 },
    { day: 'Sat', completed: 8, started: 5, efficiency: 75 },
    { day: 'Sun', completed: 6, started: 4, efficiency: 70 }
  ];

  const priorityData = [
    { name: 'High', value: 35, color: '#ef4444' },
    { name: 'Medium', value: 45, color: '#f59e0b' },
    { name: 'Low', value: 20, color: '#10b981' }
  ];

  const monthlyTrends = [
    { month: 'Jan', tasks: 45, completion: 38 },
    { month: 'Feb', tasks: 52, completion: 44 },
    { month: 'Mar', tasks: 48, completion: 41 },
    { month: 'Apr', tasks: 61, completion: 55 },
    { month: 'May', tasks: 55, completion: 48 },
    { month: 'Jun', tasks: 67, completion: 59 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(-1)}
              className="hover:bg-blue-50 text-blue-600"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Premium Analytics</h1>
              <p className="text-slate-600 mt-1">Advanced performance and productivity insights</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="mb-6">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-sm px-4 py-2">
            🚀 Premium Analytics Dashboard
          </Badge>
        </div>

        {/* Key Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Total Tasks</p>
                  <p className="text-3xl font-bold">{analyticsData.totalTasks}</p>
                  <p className="text-blue-100 text-xs mt-1">+12% from last month</p>
                </div>
                <BarChart3 className="h-10 w-10 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Completion Rate</p>
                  <p className="text-3xl font-bold">{Math.round((analyticsData.completedTasks / analyticsData.totalTasks) * 100)}%</p>
                  <p className="text-green-100 text-xs mt-1">+5% from last week</p>
                </div>
                <CheckCircle className="h-10 w-10 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Team Efficiency</p>
                  <p className="text-3xl font-bold">{analyticsData.efficiency}%</p>
                  <p className="text-purple-100 text-xs mt-1">+8% this quarter</p>
                </div>
                <TrendingUp className="h-10 w-10 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">On-Time Delivery</p>
                  <p className="text-3xl font-bold">{analyticsData.onTimeDelivery}%</p>
                  <p className="text-orange-100 text-xs mt-1">Industry leading</p>
                </div>
                <Clock className="h-10 w-10 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Performance Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Performance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="completed" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.8} />
                  <Area type="monotone" dataKey="started" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Task Priority Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Task Priority Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Department Performance & Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Department Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Department Performance Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {departmentStats.map((dept) => (
                  <div key={dept.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{dept.name}</span>
                      <div className="flex gap-2">
                        <Badge variant="secondary">{dept.completed}/{dept.tasks}</Badge>
                        <Badge variant="outline">{dept.productivity}% productivity</Badge>
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                        style={{ width: `${dept.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-slate-600">
                      <span>{dept.percentage}% completion</span>
                      <span>Efficiency: {dept.productivity}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trends */}
          <Card>
            <CardHeader>
              <CardTitle>6-Month Task Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} />
                  <Line type="monotone" dataKey="completion" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981' }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Resource Utilization */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resource Utilization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-slate-700">CPU Usage</span>
                  <span className="font-bold text-blue-600">67%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-slate-700">Memory</span>
                  <span className="font-bold text-green-600">42%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-slate-700">Storage</span>
                  <span className="font-bold text-purple-600">78%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {['Alice Johnson', 'Bob Smith', 'Carol Davis'].map((name, index) => (
                  <div key={name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {name.charAt(0)}
                      </div>
                      <span className="font-medium">{name}</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">
                      {95 - index * 5}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <p className="text-2xl font-bold text-orange-600">3.2 days</p>
                  <p className="text-sm text-slate-600">Avg. completion time</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <p className="text-2xl font-bold text-green-600">24</p>
                  <p className="text-sm text-slate-600">Tasks this week</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="text-2xl font-bold text-blue-600">92%</p>
                  <p className="text-sm text-slate-600">Quality score</p>
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
