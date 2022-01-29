import { Container } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import PageRoutes from "./PageRoutes";

const App = () => {
  return (
    <Container maxW='container.xl' p={0}>
      <NavBar />
      <PageRoutes />
    </Container>
  );
};

export default App;
