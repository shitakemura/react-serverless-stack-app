import { useEffect, useState } from "react";
import { Text, HStack, Checkbox } from "@chakra-ui/react";
import { updateTodo } from "../../lib/api";
import { Todo as TodoType } from "../../models/Todo";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  const [checked, setChecked] = useState(todo.completed);
  const [_, setError] = useState<any>(null);

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

  return (
    <HStack spacing={5}>
      <Checkbox
        isChecked={checked}
        onChange={() => setChecked((checked) => !checked)}
      />
      <Text>{todo.content}</Text>
    </HStack>
  );
};

export default Todo;
