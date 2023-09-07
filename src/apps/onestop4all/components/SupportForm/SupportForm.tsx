import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Icon,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useDisclosure
} from "@open-pioneer/chakra-integration";
import { useEffect } from "react";

import { UserSupportIcon } from "../Icons";

export interface SupportFormProps {
    openForm: boolean;
    menuClosed: () => void;
}

// https://mailtrap.io/blog/react-contact-form/

export const SupportForm = (props: SupportFormProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { openForm, menuClosed } = props;

    function closeForm(): void {
        menuClosed();
        onClose();
    }

    useEffect(() => {
        if (openForm) {
            onOpen();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openForm]);

    return (
        <Modal isOpen={isOpen} onClose={closeForm}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    <Flex alignItems="center" gap="8px">
                        <Icon boxSize={6} color={"black"}>
                            <UserSupportIcon />
                        </Icon>
                        <Box>User Support</Box>
                    </Flex>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <FormControl>
                        <FormLabel>Your name</FormLabel>
                        <Input type="text" />
                        <FormLabel pt={"1rem"}>Your mail</FormLabel>
                        <Input type="email" />
                        <FormLabel pt={"1rem"}>Subject</FormLabel>
                        <Input type="text" />
                        <FormLabel pt={"1rem"}>Content</FormLabel>
                        <Textarea placeholder="" />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={closeForm}>
                        Send Request
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
