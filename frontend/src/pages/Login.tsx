import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { useAppContext } from "../lib/useAppContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      navigate("/");
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <Stack p={4}>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box paddingBottom={4}>
            <FormLabel>Email</FormLabel>
            <Input
              id='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Box>
          <Box paddingBottom={8}>
            <FormLabel>Password</FormLabel>
            <Input
              id='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Box>
        </FormControl>
        <Button
          type='submit'
          backgroundColor='blue.200'
          color='white'
          disabled={!validateForm()}
          w='full'>
          Login
        </Button>
      </form>
    </Stack>
  );
};

export default Login;
