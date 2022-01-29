import { useEffect, useState } from "react";
import { Text, HStack, Checkbox } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { deleteTodo, updateTodo } from "../../lib/api";
import { Todo as TodoType } from "../../models/Todo";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState(todo.completed);
  const [, setError] = useState<any>(null);

  useEffect(() => {
    const update = async () => {
      try {
        await updateTodo(todo.todoId, {
          content: todo.content,
          completed: checked,
        });
      } catch (error: any) {
        setError(error);
      }
    };

    update();
  }, [checked, todo.content, todo.todoId]);

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.todoId);
    } catch (error: any) {
      setError(error);
    }
  };

  return (
    <HStack paddingY={4}>
      <Checkbox
        isChecked={checked}
        onChange={() => setChecked((checked) => !checked)}
      />
      <Text>{todo.content}</Text>
      <DeleteIcon onClick={handleDelete} />
    </HStack>
  );
};

export default Todo;
