export interface Todo {
  title: string;
  description: string;
  date?: string;
  status: "incomplete" | "complete";
  completedAt?: string | null;
}
