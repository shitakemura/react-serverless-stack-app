import { useEffect, useState } from "react";
import { Text, VStack, Heading } from "@chakra-ui/react";
import TodoList from "../components/TodoList/TodoList";
import { Todo } from "../models/Todo";
import { useAppContext } from "../lib/useAppContext";
import ErrorBanner from "../components/ErrorBanner";
import { getTodos } from "../lib/api";

const Home = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const onLoad = async () => {
      if (!isAuthenticated) return;

      setIsLoading(true);
      try {
        const todos = await getTodos();
        setTodos(todos);
      } catch (error: any) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    onLoad();
  }, [isAuthenticated]);

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
    <VStack alignItems='center'>
      {error && <ErrorBanner error={error} closeError={() => setError(null)} />}
      <TodoList todos={todos} />
    </VStack>
  );
};

export default Home;
