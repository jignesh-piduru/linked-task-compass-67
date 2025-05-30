
import { Employee } from '@/types/Employee';
import { Task } from '@/types/Task';

export const exportToCSV = (data: any[], filename: string) => {
  if (data.length === 0) return;

  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const cell = row[header];
        // Handle nested objects like toolLinks
        if (Array.isArray(cell)) {
          return `"${cell.map(item => typeof item === 'object' ? JSON.stringify(item) : item).join('; ')}"`;
        }
        if (typeof cell === 'string' && cell.includes(',')) {
          return `"${cell}"`;
        }
        return cell || '';
      }).join(',')
    )
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const parseCSV = (csvContent: string): any[] => {
  const lines = csvContent.split('\n').filter(line => line.trim());
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(header => header.trim().replace(/"/g, ''));
  const data = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const row: any = {};
      headers.forEach((header, index) => {
        let value = values[index].trim().replace(/"/g, '');
        
        // Handle special fields
        if (header === 'toolLinks' && value) {
          try {
            const items = value.split('; ');
            row[header] = items.map(item => {
              try {
                return JSON.parse(item);
              } catch {
                return { id: Date.now().toString(), name: item, url: '' };
              }
            });
          } catch {
            row[header] = [];
          }
        } else {
          row[header] = value;
        }
      });
      data.push(row);
    }
  }

  return data;
};

const parseCSVLine = (line: string): string[] => {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

export const handleFileImport = (
  file: File, 
  onSuccess: (data: any[]) => void, 
  onError: (error: string) => void
) => {
  const reader = new FileReader();
  
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const data = parseCSV(content);
      
      if (data.length === 0) {
        onError('No valid data found in the file');
        return;
      }
      
      onSuccess(data);
    } catch (error) {
      onError('Error parsing file: ' + (error as Error).message);
    }
  };
  
  reader.onerror = () => {
    onError('Error reading file');
  };
  
  reader.readAsText(file);
};

export const validateEmployeeData = (data: any[]): Employee[] => {
  return data.map((item, index) => ({
    id: item.id || (Date.now() + index).toString(),
    name: item.name || 'Unknown',
    email: item.email || '',
    department: item.department || 'Unknown',
    position: item.position || 'Unknown',
    createdDate: item.createdDate || new Date().toISOString().split('T')[0],
    status: ['active', 'inactive', 'on-leave'].includes(item.status) ? item.status : 'active',
    role: ['admin', 'manager', 'employee'].includes(item.role) ? item.role : 'employee',
    premiumAccess: item.premiumAccess === 'true' || item.premiumAccess === true
  }));
};

export const validateTaskData = (data: any[]): Task[] => {
  return data.map((item, index) => ({
    id: item.id || (Date.now() + index).toString(),
    employeeName: item.employeeName || 'Unknown',
    taskName: item.taskName || 'Untitled Task',
    category: ['Product', 'R&D'].includes(item.category) ? item.category : 'Product',
    description: item.description || '',
    startDate: item.startDate || new Date().toISOString().split('T')[0],
    estimatedEndDate: item.estimatedEndDate || new Date().toISOString().split('T')[0],
    actualEndDate: item.actualEndDate || undefined,
    toolLinks: Array.isArray(item.toolLinks) ? item.toolLinks : []
  }));
};
