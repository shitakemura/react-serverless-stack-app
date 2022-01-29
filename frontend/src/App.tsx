import { useState } from "react";
import { Container } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PageRoutes from "./PageRoutes";
import { AppContext } from "./lib/useAppContext";

const App = () => {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Container maxW='container.xl' p={0}>
        <NavBar />
        <PageRoutes />
      </Container>
    </AppContext.Provider>
  );
};

export default App;
