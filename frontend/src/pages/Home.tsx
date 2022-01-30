import { Text, VStack, Heading } from "@chakra-ui/react";
import TodoList from "../components/TodoList/TodoList";
import { useAppContext } from "../lib/useAppContext";
import ErrorBanner from "../components/ErrorBanner";
import { useTodos } from "../lib/useTodos";
import { useEffect } from "react";

const Home = () => {
  const { isAuthenticated } = useAppContext();
  const { todos, isLoading, error, getTodos, clearError } = useTodos();

  useEffect(() => {
    if (!isAuthenticated) return;
    getTodos();
  }, [isAuthenticated, getTodos]);

  if (isLoading) return null;

  if (!isAuthenticated) {
    return (
      <VStack alignItems='center'>
        <Heading>Todo App - STT</Heading>
        <Text>A simple todo taking app</Text>
      </VStack>
    );
  }

  return (
    <VStack alignItems='flex-start'>
      {error && <ErrorBanner error={error} closeError={clearError} />}
      <TodoList todos={todos} />
    </VStack>
  );
};

export default Home;
