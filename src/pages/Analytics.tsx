
import { BarChart3, TrendingUp, Users, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Analytics = () => {
  // Mock data for demonstration
  const analyticsData = {
    totalTasks: 125,
    completedTasks: 89,
    inProgressTasks: 36,
    totalEmployees: 15,
    averageCompletionTime: '3.2 days',
    productivity: 78
  };

  const departmentStats = [
    { name: 'Engineering', tasks: 45, completed: 32, percentage: 71 },
    { name: 'Design', tasks: 28, completed: 24, percentage: 86 },
    { name: 'Marketing', tasks: 22, completed: 18, percentage: 82 },
    { name: 'Sales', tasks: 30, completed: 15, percentage: 50 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Analytics</h1>
            <p className="text-slate-600 mt-1">Track performance and productivity metrics</p>
          </div>
          <Button variant="outline">
            Export Report
          </Button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Total Tasks</p>
                <p className="text-3xl font-bold text-slate-900">{analyticsData.totalTasks}</p>
              </div>
              <BarChart3 className="h-10 w-10 text-blue-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Completed</p>
                <p className="text-3xl font-bold text-green-600">{analyticsData.completedTasks}</p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">In Progress</p>
                <p className="text-3xl font-bold text-orange-600">{analyticsData.inProgressTasks}</p>
              </div>
              <Clock className="h-10 w-10 text-orange-500" />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm">Team Members</p>
                <p className="text-3xl font-bold text-purple-600">{analyticsData.totalEmployees}</p>
              </div>
              <Users className="h-10 w-10 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Department Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Department Performance</h3>
            <div className="space-y-4">
              {departmentStats.map((dept) => (
                <div key={dept.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-700">{dept.name}</span>
                    <span className="text-sm text-slate-600">{dept.completed}/{dept.tasks} tasks</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${dept.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-right text-sm text-slate-600">{dept.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Key Metrics</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-600 text-sm">Average Completion Time</p>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.averageCompletionTime}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-500" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-600 text-sm">Team Productivity</p>
                  <p className="text-2xl font-bold text-slate-900">{analyticsData.productivity}%</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">{analyticsData.productivity}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
