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
import { useEffect, useState } from "react";
import { useService } from "open-pioneer:react-hooks";
import { UserSupportIcon } from "../Icons";

export interface SupportFormProps {
    openForm: boolean;
    menuClosed: () => void;
}

// https://mailtrap.io/blog/react-contact-form/

export const SupportForm = (props: SupportFormProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { openForm, menuClosed } = props;
    const searchSrvc = useService("onestop4all.SearchService");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        content: ""
    });

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isNameFilled, setIsNameFilled] = useState(true);
    const [isSubjectFilled, setIsSubjectFilled] = useState(true);
    const [isContentFilled, setIsContentFilled] = useState(true);

    function validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    function handleSubmit(): void {
        const { name, email, subject, content } = formData;
        const isEmailValid = validateEmail(email);
        const isNameFilled = name.trim() !== "";
        const isSubjectFilled = subject.trim() !== "";
        const isContentFilled = content.trim() !== "";

        if (isEmailValid && isNameFilled && isSubjectFilled && isContentFilled) {
            console.log("Sending request with form data:", formData);
            searchSrvc.sendSupportRequest(name, email, subject, content).then((result) => {
                console.log(result);
            });
            closeForm();
        } else {
            setIsEmailValid(isEmailValid);
            setIsNameFilled(isNameFilled);
            setIsSubjectFilled(isSubjectFilled);
            setIsContentFilled(isContentFilled);
        }
    }

    function closeForm(): void {
        menuClosed();
        onClose();
    }

    useEffect(() => {
        if (openForm) {
            onOpen();
        }
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
                        <Input
                            type="text"
                            name="name"
                            onChange={handleInputChange}
                            isInvalid={!isNameFilled}
                        />
                        {!isNameFilled && <p color="red">Name cannot be empty.</p>}
                        <FormLabel pt={"1rem"}>Your mail</FormLabel>
                        <Input
                            type="email"
                            name="email"
                            onChange={handleInputChange}
                            isInvalid={!isEmailValid}
                        />
                        {!isEmailValid && <p color="red">Please enter a valid email address.</p>}
                        <FormLabel pt={"1rem"}>Subject</FormLabel>
                        <Input
                            type="text"
                            name="subject"
                            onChange={handleInputChange}
                            isInvalid={!isSubjectFilled}
                        />
                        {!isSubjectFilled && <p color="red">Subject cannot be empty.</p>}
                        <FormLabel pt={"1rem"}>Content</FormLabel>
                        <Textarea
                            name="content"
                            placeholder=""
                            onChange={handleInputChange}
                            isInvalid={!isContentFilled}
                        />
                        {!isContentFilled && <p color="red">Content cannot be empty.</p>}
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
                        Send Request
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};
