import { Button, HStack, Input } from "@chakra-ui/react";
import { useTodos } from "../../lib/useTodos";

const AddTodo = () => {
  const { newTodoContent, addLoading, setNewTodoContent, addTodo } = useTodos();

  return (
    <HStack>
      <Input
        value={newTodoContent}
        onChange={(e) => setNewTodoContent(e.target.value)}
      />
      <Button onClick={addTodo} isLoading={addLoading}>
        Add Todo
      </Button>
    </HStack>
  );
};

export default AddTodo;
