export type Todo = {
  userId: string;
  todoId: string;
  createdAt: number;
} & BaseTodo;

export type BaseTodo = {
  content: string;
  completed: boolean;
};
