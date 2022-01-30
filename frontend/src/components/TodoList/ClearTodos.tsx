import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useTodos } from "../../lib/useTodos";

const ClearTodos = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { clearTodos } = useTodos();

  const handleClear = () => {
    onClose();
    clearTodos();
  };

  return (
    <Stack>
      <Button onClick={onOpen}>Clear All Todos</Button>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>全てのTodoを削除します。よろしいですか？</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick={handleClear}>
              OK
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default ClearTodos;
