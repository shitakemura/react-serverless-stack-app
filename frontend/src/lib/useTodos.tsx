import {
  useState,
  useCallback,
  createContext,
  PropsWithChildren,
  useContext,
} from "react";
import { BaseTodo, Todo } from "../models/Todo";
import * as API from "./api";

type TodosContextType = {
  todos: Todo[];
  newTodoContent: string;
  isLoading: boolean;
  error: any;
  setNewTodoContent: (todoContent: string) => void;
  getTodos: () => void;
  addTodo: () => void;
  updateTodo: (todoId: string, base: BaseTodo) => void;
  deleteTodo: (todoId: string) => void;
  clearError: () => void;
};

const TodosContext = createContext({} as TodosContextType);

export const TodosProvider = ({ children }: PropsWithChildren<{}>) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoContent, setNewTodoContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const getTodos = useCallback(async () => {
    console.log(`fetchTodos`);
    setIsLoading(true);
    try {
      const todos = await API.getTodos();
      setTodos(todos);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addTodo = async () => {
    console.log(`addTodo`);
    setIsLoading(true);
    try {
      const newTodo = await API.addTodo(newTodoContent);
      setTodos([...todos, newTodo]);
      setNewTodoContent("");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateTodo = async (todoId: string, body: BaseTodo) => {
    console.log(`updateTodo`);
    try {
      const updateTodo = await API.updateTodo(todoId, body);
      setTodos([
        ...todos.map((todo) => {
          if (todo.todoId === todoId) {
            return updateTodo;
          } else {
            return todo;
          }
        }),
      ]);
    } catch (error: any) {
      setError(error);
    }
  };

  const deleteTodo = async (todoId: string) => {
    console.log(`deleteTodo`);
    try {
      await API.deleteTodo(todoId);
      setTodos([...todos.filter((todo) => todo.todoId !== todoId)]);
    } catch (error: any) {
      setError(error);
    }
  };

  // const clearTodo = () => {};

  const clearError = () => {
    setError(null);
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        newTodoContent,
        isLoading,
        error,
        setNewTodoContent,
        getTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        clearError,
      }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
