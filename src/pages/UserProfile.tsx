
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  ArrowLeft, 
  Crown, 
  User, 
  Mail, 
  Calendar, 
  Briefcase, 
  Phone, 
  MapPin,
  Download,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  Star,
  Award
} from 'lucide-react';
import { Employee } from '@/types/Employee';
import { Task } from '@/types/Task';

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  
  // Mock data - in a real app this would come from a global state or API
  const mockEmployees: Employee[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      department: 'Engineering',
      position: 'Senior Developer',
      skills: ['React', 'TypeScript', 'Node.js'],
      createdDate: '2024-01-01'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      department: 'Design',
      position: 'UX Designer',
      skills: ['Figma', 'Sketch', 'User Research'],
      createdDate: '2024-01-02'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      department: 'Engineering',
      position: 'Backend Developer',
      skills: ['Python', 'PostgreSQL', 'Docker'],
      createdDate: '2024-01-03'
    }
  ];

  const mockTasks: Task[] = [
    {
      id: '1',
      taskName: 'Design System Implementation',
      description: 'Create a comprehensive design system for the application',
      category: 'Product',
      employeeName: 'John Doe',
      startDate: '2024-01-15',
      estimatedEndDate: '2024-02-15',
      actualEndDate: '',
      toolLinks: [
        { id: '1', name: 'Figma Design', url: 'https://figma.com/design-system' }
      ]
    },
    {
      id: '2',
      taskName: 'API Integration',
      description: 'Integrate the new payment API endpoints',
      category: 'R&D',
      employeeName: 'Jane Smith',
      startDate: '2024-01-20',
      estimatedEndDate: '2024-02-20',
      actualEndDate: '',
      toolLinks: [
        { id: '2', name: 'API Documentation', url: 'https://api-docs.example.com' }
      ]
    },
    {
      id: '3',
      taskName: 'Database Optimization',
      description: 'Optimize database queries for better performance',
      category: 'Product',
      employeeName: 'Mike Johnson',
      startDate: '2024-01-10',
      estimatedEndDate: '2024-02-10',
      actualEndDate: '2024-02-08',
      toolLinks: []
    }
  ];
  
  // Find the employee by ID or name
  const employee = mockEmployees.find(emp => emp.id === userId || emp.name.toLowerCase().replace(/\s+/g, '-') === userId);
  
  if (!employee) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">User Not Found</h2>
            <p className="text-gray-600 mb-4">The requested user profile could not be found.</p>
            <Button onClick={() => navigate(-1)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock premium status - in real app this would come from user data
  const isPremiumUser = employee.premiumAccess || Math.random() > 0.5;
  
  // Get user's tasks
  const userTasks = mockTasks.filter(task => task.employeeName === employee.name);
  const todayTasks = userTasks.filter(task => {
    const today = new Date().toDateString();
    return new Date(task.startDate).toDateString() === today;
  });
  const activeTasks = userTasks.filter(task => !task.actualEndDate);
  const inProgressTasks = userTasks.filter(task => !task.actualEndDate && new Date(task.startDate) <= new Date());
  const futureTasks = userTasks.filter(task => !task.actualEndDate && new Date(task.startDate) > new Date());
  const completedTasks = userTasks.filter(task => task.actualEndDate);

  const handleDownloadPDF = () => {
    // Mock PDF download functionality
    console.log('Downloading profile as PDF...');
    alert('PDF download feature would be implemented here');
  };

  const handleEditProfile = () => {
    console.log('Edit profile...');
    alert('Edit profile feature would be implemented here');
  };

  const handleDeleteProfile = () => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      console.log('Delete profile...');
      alert('Delete profile feature would be implemented here');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button and Actions */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="hover:bg-blue-50 text-blue-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleEditProfile}>
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button variant="outline" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-4 w-4" />
              Download PDF
            </Button>
            <Button variant="destructive" onClick={handleDeleteProfile}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="mb-6">
          <CardContent className="p-8">
            <div className="flex items-start gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={employee.profilePicture} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-2xl">
                  {employee.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-slate-900">{employee.name}</h1>
                  {isPremiumUser && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      <Crown className="mr-1 h-3 w-3" />
                      Premium
                    </Badge>
                  )}
                  <Badge variant="secondary" className={
                    employee.status === 'active' ? 'bg-green-100 text-green-800' :
                    employee.status === 'inactive' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }>
                    {employee.status || 'active'}
                  </Badge>
                </div>
                <p className="text-lg text-slate-600 mb-1">{employee.position}</p>
                <div className="flex items-center text-slate-500 mb-2">
                  <Briefcase className="mr-2 h-4 w-4" />
                  {employee.department}
                </div>
                <div className="flex items-center text-slate-500">
                  <Calendar className="mr-2 h-4 w-4" />
                  Employee ID: {employee.employeeId || employee.id}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Personal Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Personal Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Full Name</p>
                    <p className="text-slate-900">{employee.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Employee ID</p>
                    <p className="text-slate-900">{employee.employeeId || employee.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Email</p>
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-slate-400" />
                      <p className="text-slate-900">{employee.email}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Phone Number</p>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-slate-400" />
                      <p className="text-slate-900">{employee.phoneNumber || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Address</p>
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-4 w-4 text-slate-400" />
                    <p className="text-slate-900">{employee.address || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Details */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Briefcase className="mr-2 h-5 w-5" />
                Professional Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Role/Designation</p>
                    <p className="text-slate-900">{employee.position}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Department</p>
                    <p className="text-slate-900">{employee.department}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">Joining Date</p>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                      <p className="text-slate-900">{employee.joiningDate || new Date(employee.createdDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-500">Employment Type</p>
                    <Badge variant="outline">
                      {employee.employmentType || 'Full-time'}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500">Manager/Supervisor</p>
                  <p className="text-slate-900">{employee.manager || 'Not assigned'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Skillset & Experience */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Skillset & Experience
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {(employee.skills || ['React', 'TypeScript', 'Node.js', 'Python']).map((skill, index) => (
                      <Badge key={index} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Certifications</p>
                  <div className="space-y-1">
                    {(employee.certifications || ['AWS Certified', 'React Developer']).map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="mr-2 h-3 w-3 text-blue-500" />
                        <span className="text-sm text-slate-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Years of Experience</p>
                  <p className="text-2xl font-bold text-slate-900">{employee.yearsOfExperience || 3}+ years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-2">Previous Employers</p>
                  <div className="space-y-1">
                    {(employee.previousEmployers || ['Tech Corp', 'Innovation Labs']).map((employer, index) => (
                      <p key={index} className="text-sm text-slate-700">• {employer}</p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tasks Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Today's Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <Clock className="mr-2 h-5 w-5" />
                Today's Tasks ({todayTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {todayTasks.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No tasks for today</p>
              ) : (
                <div className="space-y-3">
                  {todayTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                      <h4 className="font-medium text-slate-900">{task.taskName}</h4>
                      <p className="text-sm text-slate-600">{task.category}</p>
                    </div>
                  ))}
                  {todayTasks.length > 3 && (
                    <p className="text-sm text-slate-500 text-center">+{todayTasks.length - 3} more</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Active Tasks ({activeTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {activeTasks.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No active tasks</p>
              ) : (
                <div className="space-y-3">
                  {activeTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-3 border border-green-200 rounded-lg bg-green-50">
                      <h4 className="font-medium text-slate-900">{task.taskName}</h4>
                      <p className="text-sm text-slate-600">{task.category}</p>
                      <Badge variant="secondary" className="mt-1 bg-green-100 text-green-800">
                        Active
                      </Badge>
                    </div>
                  ))}
                  {activeTasks.length > 3 && (
                    <p className="text-sm text-slate-500 text-center">+{activeTasks.length - 3} more</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-purple-600">
                <CheckCircle className="mr-2 h-5 w-5" />
                Completed Tasks ({completedTasks.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedTasks.length === 0 ? (
                <p className="text-slate-500 text-center py-4">No completed tasks</p>
              ) : (
                <div className="space-y-3">
                  {completedTasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-3 border border-purple-200 rounded-lg bg-purple-50">
                      <h4 className="font-medium text-slate-900">{task.taskName}</h4>
                      <p className="text-sm text-slate-600">{task.category}</p>
                      <Badge variant="secondary" className="mt-1 bg-purple-100 text-purple-800">
                        Completed
                      </Badge>
                    </div>
                  ))}
                  {completedTasks.length > 3 && (
                    <p className="text-sm text-slate-500 text-center">+{completedTasks.length - 3} more</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Task Statistics */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Task Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{todayTasks.length}</p>
                <p className="text-sm text-slate-600">Today</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{activeTasks.length}</p>
                <p className="text-sm text-slate-600">Active</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">{inProgressTasks.length}</p>
                <p className="text-sm text-slate-600">In Progress</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">{futureTasks.length}</p>
                <p className="text-sm text-slate-600">Future</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">{completedTasks.length}</p>
                <p className="text-sm text-slate-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;
