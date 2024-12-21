export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  dueDate?: Date;
}

export type TaskCategory = {
  name: string;
  color: string;
};