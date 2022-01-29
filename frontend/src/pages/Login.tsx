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
import ErrorBanner from "../components/ErrorBanner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const validateForm = () => {
    return email.length > 0 && password.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(email, password);
      userHasAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack p={4}>
      {error && <ErrorBanner error={error} closeError={() => setError(null)} />}
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
          w='full'
          isLoading={isLoading}>
          Login
        </Button>
      </form>
    </Stack>
  );
};

export default Login;
