export interface UserType {
  firstName?: string;
  lastName?: string;
  password?: string;
  confirmPassword?: string;
  email?: string;
}
export interface Task {
  id: string;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
  dueDate: string;
  status: string | boolean;
}
