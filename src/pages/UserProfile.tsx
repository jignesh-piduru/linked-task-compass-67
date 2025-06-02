
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Crown, User, Mail, Calendar, Briefcase } from 'lucide-react';
import { Employee } from '@/types/Employee';
import { Task } from '@/types/Task';

interface UserProfileProps {
  employees?: Employee[];
  tasks?: Task[];
}

const UserProfile = ({ employees = [], tasks = [] }: UserProfileProps) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Find the employee by ID or name
  const employee = employees.find(emp => emp.id === userId || emp.name.toLowerCase().replace(/\s+/g, '-') === userId);
  
  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">The requested user profile could not be found.</p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock premium status - in real app this would come from user data
  const isPremiumUser = Math.random() > 0.5;
  
  // Get user's tasks
  const userTasks = tasks.filter(task => task.employeeName === employee.name);
  const completedTasks = userTasks.filter(task => task.actualEndDate).length;
  const pendingTasks = userTasks.filter(task => !task.actualEndDate).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4 hover:bg-blue-50 text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6">
          <div className="p-8">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
                    {isPremiumUser && (
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                        <Crown className="mr-1 h-3 w-3" />
                        Premium
                      </Badge>
                    )}
                  </div>
                  <p className="text-lg text-slate-600 mb-1">{employee.position}</p>
                  <div className="flex items-center text-slate-500">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {employee.department}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats and Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">Email</p>
                  <p className="text-slate-900">{employee.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Joined Date</p>
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                    <p className="text-slate-900">{new Date(employee.createdDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Task Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Task Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Total Tasks</span>
                  <span className="font-semibold text-lg">{userTasks.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Completed</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {completedTasks}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Pending</span>
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    {pendingTasks}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Premium Features */}
          {isPremiumUser && (
            <Card className="border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-800">
                  <Crown className="mr-2 h-5 w-5" />
                  Premium Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Advanced Analytics
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Priority Support
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Unlimited Projects
                  </div>
                  <div className="flex items-center text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Custom Integrations
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Recent Tasks */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {userTasks.length === 0 ? (
              <p className="text-slate-500 text-center py-8">No tasks assigned to this user.</p>
            ) : (
              <div className="space-y-4">
                {userTasks.slice(0, 5).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-slate-900">{task.taskName}</h4>
                      <p className="text-sm text-slate-500">{task.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={task.actualEndDate ? "secondary" : "outline"}>
                        {task.actualEndDate ? "Completed" : "In Progress"}
                      </Badge>
                    </div>
                  </div>
                ))}
                {userTasks.length > 5 && (
                  <p className="text-sm text-slate-500 text-center pt-2">
                    And {userTasks.length - 5} more tasks...
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
