import { API, Auth } from "aws-amplify";

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
