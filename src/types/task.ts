export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: TaskPriority;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = "all" | "active" | "completed";
