
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Task } from '@/types/Task';
import { Employee } from '@/types/Employee';
import ToolLinkManager from './ToolLinkManager';

interface TaskFormProps {
  task?: Task;
  employees: Employee[];
  onSubmit: (task: Omit<Task, 'id'>) => void;
  onClose: () => void;
}

const TaskForm = ({ task, employees, onSubmit, onClose }: TaskFormProps) => {
  const [formData, setFormData] = useState({
    employeeName: task?.employeeName || '',
    taskName: task?.taskName || '',
    category: task?.category || 'Product' as 'Product' | 'R&D',
    description: task?.description || '',
    startDate: task?.startDate || new Date().toISOString().split('T')[0],
    estimatedEndDate: task?.estimatedEndDate || '',
    actualEndDate: task?.actualEndDate || '',
    toolLinks: task?.toolLinks || []
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employeeName">Employee</Label>
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
          <Label htmlFor="taskName">Task Name</Label>
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
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          required
          placeholder="Enter task description"
          rows={3}
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
          <Label htmlFor="estimatedEndDate">Estimated End Date</Label>
          <Input
            id="estimatedEndDate"
            type="date"
            value={formData.estimatedEndDate}
            onChange={(e) => handleInputChange('estimatedEndDate', e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="actualEndDate">Actual End Date</Label>
          <Input
            id="actualEndDate"
            type="date"
            value={formData.actualEndDate}
            onChange={(e) => handleInputChange('actualEndDate', e.target.value)}
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

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
