import { Box, Text } from "@chakra-ui/react";
import { Todo as TodoType } from "../../models/Todo";

type TodoProps = {
  todo: TodoType;
};

const Todo = ({ todo }: TodoProps) => {
  return (
    <Box>
      <Text>{todo.content}</Text>
    </Box>
  );
};

export default Todo;
