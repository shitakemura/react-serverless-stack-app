import { useState } from "react";
import {
  Box,
  FormLabel,
  Stack,
  Input,
  FormControl,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useFormFields } from "../lib/useFormFields";
import { useAppContext } from "../lib/useAppContext";
import { Auth } from "aws-amplify";
import { ISignUpResult } from "amazon-cognito-identity-js";
import ErrorBanner from "../components/ErrorBanner";

const Signup = () => {
  const { fields, handleFieldChange } = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    confirmationCode: "",
  });
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
  const { userHasAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const validateForm = () => {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  };

  const validateConfirmationForm = () => {
    return fields.confirmationCode.length > 0;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
      });
      setNewUser(newUser);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      navigate("/");
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <FormControl>
          <Box paddingBottom={4}>
            <FormLabel>Email</FormLabel>
            <Input
              autoFocus
              type='email'
              id='email'
              placeholder='email'
              value={fields.email}
              onChange={handleFieldChange}
            />
          </Box>
          <Box paddingBottom={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              id='password'
              placeholder='password'
              value={fields.password}
              onChange={handleFieldChange}
            />
          </Box>
          <Box paddingBottom={8}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              id='confirmPassword'
              placeholder='password'
              value={fields.confirmPassword}
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
          Signup
        </Button>
      </form>
    );
  };

  const renderConfirmationForm = () => {
    return (
      <form onSubmit={handleConfirmationSubmit}>
        <FormControl>
          <Box paddingBottom={8}>
            <FormLabel>Confirmation Code</FormLabel>
            <Input
              autoFocus
              type='tel'
              id='confirmationCode'
              value={fields.confirmationCode}
              onChange={handleFieldChange}
            />
          </Box>
        </FormControl>
        <Button
          type='submit'
          backgroundColor='green.200'
          color='white'
          disabled={!validateConfirmationForm()}
          w='full'
          isLoading={isLoading}>
          Verify
        </Button>
      </form>
    );
  };

  return (
    <Stack p={4}>
      {error && <ErrorBanner error={error} closeError={() => setError(null)} />}
      {newUser === null ? renderForm() : renderConfirmationForm()}
    </Stack>
  );
};

export default Signup;
