import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import { TodosProvider } from "./lib/useTodos";

const PageRoutes = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <TodosProvider>
            <Home />
          </TodosProvider>
        }
      />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default PageRoutes;
