import { Stack } from "@chakra-ui/react";
import { Todo as TodoType } from "../../models/Todo";
import Todo from "./Todo";

type TodoListProps = {
  todos: TodoType[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <Stack>
      {todos.map((todo) => (
        <Todo key={todo.todoId} todo={todo} />
      ))}
    </Stack>
  );
};

export default TodoList;
