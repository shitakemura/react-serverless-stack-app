import { VStack } from "@chakra-ui/react";
import { Todo as TodoType } from "../../models/Todo";
import Todo from "./Todo";

type TodoListProps = {
  todos: TodoType[];
};

const TodoList = ({ todos }: TodoListProps) => {
  return (
    <VStack alignItems='flex-start'>
      {todos.map((todo) => (
        <Todo key={todo.todoId} todo={todo} />
      ))}
    </VStack>
  );
};

export default TodoList;
