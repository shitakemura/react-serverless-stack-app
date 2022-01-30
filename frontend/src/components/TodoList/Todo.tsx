import { Text, HStack, Checkbox } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Todo as TodoType } from "../../models/Todo";
import { useTodos } from "../../lib/useTodos";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const { updateTodo, deleteTodo } = useTodos();

  const handleChange = () => {
    updateTodo(todo.todoId, {
      content: todo.content,
      completed: !todo.completed,
    });
  };

  return (
    <HStack paddingY={4}>
      <Checkbox isChecked={todo.completed} onChange={handleChange} />
      <Text>{todo.content}</Text>
      <DeleteIcon onClick={() => deleteTodo(todo.todoId)} />
    </HStack>
  );
};

export default Todo;
