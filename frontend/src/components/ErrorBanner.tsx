import {
  Alert,
  AlertDescription,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";

type ErrorBannerProps = {
  error: any;
  closeError: () => void;
};

const ErrorBanner = ({ error, closeError }: ErrorBannerProps) => {
  const description = error instanceof Error ? error.message : "";

  return (
    <Alert status='error'>
      <AlertTitle mr={2}>Error</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
      <CloseButton
        position='absolute'
        right='8px'
        top='8px'
        onClick={closeError}
      />
    </Alert>
  );
};

export default ErrorBanner;
