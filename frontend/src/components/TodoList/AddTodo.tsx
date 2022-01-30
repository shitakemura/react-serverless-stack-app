import { Button, HStack, Input } from "@chakra-ui/react";
import { useTodos } from "../../lib/useTodos";

const AddTodo = () => {
  const { newTodoContent, isLoading, setNewTodoContent, addTodo } = useTodos();

  return (
    <HStack>
      <Input
        value={newTodoContent}
        onChange={(e) => setNewTodoContent(e.target.value)}
      />
      <Button onClick={addTodo} isLoading={isLoading}>
        Add Todo
      </Button>
    </HStack>
  );
};

export default AddTodo;
