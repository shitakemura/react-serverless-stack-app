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
import { useFormFields } from "../lib/useFormFields";

const Login = () => {
  const { fields, handleFieldChange } = useFormFields({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { userHasAuthenticated } = useAppContext();
  const navigate = useNavigate();

  const validateForm = () => {
    return fields.email.length > 0 && fields.password.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.signIn(fields.email, fields.password);
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
              type='text'
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Box>
          <Box paddingBottom={8}>
            <FormLabel>Password</FormLabel>
            <Input
              id='password'
              placeholder='password'
              type='password'
              value={fields.password}
              onChange={handleFieldChange}
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
