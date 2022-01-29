import { Flex, HStack, Text, Link, Box } from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../lib/useAppContext";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <NavBarContainer>
      <Text fontSize={24} fontWeight='bold' onClick={() => navigate("/")}>
        Todo App - SST
      </Text>
      <MenuLinks />
    </NavBarContainer>
  );
};

type NavBarContainerProps = {
  children: React.ReactNode;
};

const NavBarContainer = ({ children }: NavBarContainerProps) => {
  return (
    <Flex
      as='nav'
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      mb={8}
      p={8}
      bg='green.400'
      color='white'>
      {children}
    </Flex>
  );
};

const MenuLinks = () => {
  const { isAuthenticated, userHasAuthenticated } = useAppContext();

  const handleLogout = () => {
    userHasAuthenticated(false);
  };

  return (
    <Box>
      {isAuthenticated ? (
        <Text fontWeight='bold' onClick={handleLogout}>
          Logout
        </Text>
      ) : (
        <HStack spacing={8} align='center' justify='center'>
          <Link as={ReactRouterLink} to='/signup'>
            <Text fontWeight='bold'>Signup</Text>
          </Link>
          <Link as={ReactRouterLink} to='/login'>
            <Text fontWeight='bold'>Login</Text>
          </Link>
        </HStack>
      )}
    </Box>
  );
};

export default NavBar;
