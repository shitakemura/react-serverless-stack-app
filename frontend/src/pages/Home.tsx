import { Text, VStack, Heading } from "@chakra-ui/react";
import TodoList from "../components/TodoList/TodoList";
import { useAppContext } from "../lib/useAppContext";
import ErrorBanner from "../components/ErrorBanner";
import { useTodos } from "../lib/useTodos";
import { useEffect } from "react";
import AddTodo from "../components/TodoList/AddTodo";
import ClearTodos from "../components/TodoList/ClearTodos";

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const { todos, error, getTodos, clearError } = useTodos();

  useEffect(() => {
    if (!isAuthenticated) return;
    getTodos();
  }, [isAuthenticated, getTodos]);

  if (!isAuthenticated) {
    return (
      <VStack alignItems='center'>
        <Heading>Todo App - STT</Heading>
        <Text>A simple todo taking app</Text>
      </VStack>
    );
  }

  return (
    <VStack paddingX={8} alignItems='flex-start'>
      {error && <ErrorBanner error={error} closeError={clearError} />}
      <AddTodo />
      <TodoList todos={todos} />
      <ClearTodos />
    </VStack>
  );
};

export default Home;
