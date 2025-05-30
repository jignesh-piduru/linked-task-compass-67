
export interface ToolLink {
  id: string;
  name: string;
  url: string;
}

export interface Task {
  id: string;
  employeeName: string;
  taskName: string;
  category: 'Product' | 'R&D';
  description: string;
  startDate: string;
  estimatedEndDate: string;
  actualEndDate?: string;
  toolLinks: ToolLink[];
}
