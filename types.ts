export interface Category {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  categoryId: string;
  startWeek: number;
  duration: number; 
  isDeliverable?: boolean;
}

export interface Project {
  id: string;
  name: string;
  tasks: Task[];
  cost: number;
  totalWeeks: number;
}

export interface CategoryStyle {
  container: string;
  text: string;
}
