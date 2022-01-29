import { useEffect, useState } from "react";
import { Container } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PageRoutes from "./PageRoutes";
import { AppContext } from "./lib/useAppContext";
import { Auth } from "aws-amplify";

const App = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {
    const onLoad = async () => {
      try {
        await Auth.currentSession();
        userHasAuthenticated(true);
      } catch (e: any) {}
      setIsAuthenticating(false);
    };

    onLoad();
  });

  if (isAuthenticating) return null;

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
