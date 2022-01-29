import { API, Auth } from "aws-amplify";
import { BaseTodo } from "../models/Todo";

const apiName = "todos";

const authHeader = async () => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getTodos = async () => {
  const path = "/todos";
  const init = { headers: await authHeader() };
  return await API.get(apiName, path, init);
};

export const updateTodo = async (id: string, body: BaseTodo) => {
  const path = `/todos/${id}`;
  const init = {
    headers: await authHeader(),
    body,
  };
  console.log(JSON.stringify(init));
  return await API.put(apiName, path, init);
};

export const deleteTodo = async (id: string) => {
  const path = `/todos/${id}`;
  const init = { headers: await authHeader() };
  return await API.del(apiName, path, init);
};
