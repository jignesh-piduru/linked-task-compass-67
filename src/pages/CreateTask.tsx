
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Sidebar from '@/components/Sidebar';
import ToolLinkManager from '@/components/ToolLinkManager';

const CreateTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [activeTab, setActiveTab] = useState('tasks');
  const [formData, setFormData] = useState({
    employeeName: '',
    taskName: '',
    category: 'Product' as 'Product' | 'R&D',
    description: '',
    startDate: new Date().toISOString().split('T')[0],
    estimatedEndDate: '',
    actualEndDate: '',
    toolLinks: []
  });

  const employees = [
    { id: '1', name: 'Sarah Chen' },
    { id: '2', name: 'Marcus Johnson' },
    { id: '3', name: 'Elena Rodriguez' },
    { id: '4', name: 'David Kim' },
    { id: '5', name: 'Lisa Wang' },
    { id: '6', name: 'James Wilson' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employeeName || !formData.taskName || !formData.description || !formData.estimatedEndDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    console.log('Creating task:', formData);
    
    toast({
      title: "Task created",
      description: "Your task has been successfully created.",
    });
    
    navigate('/');
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="flex-1 ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create New Task</h1>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Employee</Label>
                  <Select value={formData.employeeName} onValueChange={(value) => handleInputChange('employeeName', value)}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select employee" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map((employee) => (
                        <SelectItem key={employee.id} value={employee.name}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="taskName">Task Name</Label>
                  <Input
                    id="taskName"
                    value={formData.taskName}
                    onChange={(e) => handleInputChange('taskName', e.target.value)}
                    required
                    placeholder="Enter task name"
                    className="h-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="R&D">R&D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  placeholder="Enter task description"
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedEndDate">Estimated End Date</Label>
                  <Input
                    id="estimatedEndDate"
                    type="date"
                    value={formData.estimatedEndDate}
                    onChange={(e) => handleInputChange('estimatedEndDate', e.target.value)}
                    required
                    min={formData.startDate}
                    className="h-12"
                    placeholder="dd/mm/yyyy"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualEndDate">Actual End Date</Label>
                  <Input
                    id="actualEndDate"
                    type="date"
                    value={formData.actualEndDate}
                    onChange={(e) => handleInputChange('actualEndDate', e.target.value)}
                    min={formData.startDate}
                    className="h-12"
                    placeholder="dd/mm/yyyy"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tool Links</Label>
                <ToolLinkManager
                  toolLinks={formData.toolLinks}
                  onChange={(toolLinks) => handleInputChange('toolLinks', toolLinks)}
                />
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg font-medium"
                >
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CreateTask;
