
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import type { Task } from '@/types/Task';
import ToolLinkManager from '@/components/ToolLinkManager';

const AddTask = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  // Enhanced employees data matching the main application
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
    
    // Mock task creation - in real app this would call an API or update context
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:bg-blue-50"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Create New Task
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeName">Assign to Employee *</Label>
                  <Select value={formData.employeeName} onValueChange={(value) => handleInputChange('employeeName', value)}>
                    <SelectTrigger>
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
                  <Label htmlFor="taskName">Task Name *</Label>
                  <Input
                    id="taskName"
                    value={formData.taskName}
                    onChange={(e) => handleInputChange('taskName', e.target.value)}
                    required
                    placeholder="Enter task name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Product">Product</SelectItem>
                    <SelectItem value="R&D">R&D</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                  placeholder="Enter detailed task description"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange('startDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="estimatedEndDate">Estimated End Date *</Label>
                  <Input
                    id="estimatedEndDate"
                    type="date"
                    value={formData.estimatedEndDate}
                    onChange={(e) => handleInputChange('estimatedEndDate', e.target.value)}
                    required
                    min={formData.startDate}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="actualEndDate">Actual End Date (Optional)</Label>
                  <Input
                    id="actualEndDate"
                    type="date"
                    value={formData.actualEndDate}
                    onChange={(e) => handleInputChange('actualEndDate', e.target.value)}
                    min={formData.startDate}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tool Links (Optional)</Label>
                <ToolLinkManager
                  toolLinks={formData.toolLinks}
                  onChange={(toolLinks) => handleInputChange('toolLinks', toolLinks)}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Create Task
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/')}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddTask;
