import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Flex,
  Spacer,
  ButtonGroup,
  Box,
  Text,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../services/projectsApi";
import { addProject, editProject } from "./projectSlice";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 35) {
    errors.name = "Name too long";
  }

  if (values.email) {
    if (!/[\w\d\.-]+@[\w\d\.-]+\.[\w\d\.-]+/.test(values.email)) {
      errors.email = "Please enter a valid email address";
    }
  }
  return errors;
};

const ProjectForm = ({ project, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const [emailValue, setEmailValue] = useState({
    value: "",
    error: "",
  });
  const [emails, setEmails] = useState([]);

  function handleEmailChange(e) {
    setEmailValue({ value: e.target.value });
  }

  function handleKeyDown(e) {
    if ([",", "Tab", "Space"].includes(e.key)) {
      e.preventDefault();
      let email = emailValue.value.trim();

      if (emails.includes(email)) {
        setEmailValue({
          value: emailValue.value,
          error: "User is already added",
        });
        return;
      }

      const validation = validate({ email: email });
      if (!validation.email) {
        setEmails((prev) => [...prev, email]);
        setEmailValue({
          value: "",
          error: "",
        });
      } else {
        setEmailValue({
          value: emailValue.value,
          error: validation.email,
        });
      }
    }
  }

  function handleUpdateProject(values) {
    const projectToUpdate = { ...project, ...values };
    if (token) {
      updateProject({ project: projectToUpdate, token: token })
        .unwrap()
        .then((payload) => {
          dispatch(editProject(projectToUpdate));
          onClose();
        })
        .catch((err) => {
          console.error(
            "Error occured while creating new project",
            err.message
          );
        });
    } else {
      console.warn("Please log in");
    }
  }

  function handleNewProject(values) {
    createProject({ project: values, token: token })
      .unwrap()
      .then((payload) => {
        dispatch(addProject(values));
        onClose();
      })
      .catch((err) => {
        console.error("Error occured while creating new project", err.message);
        return false;
      });
  }

  function handleSubmit(values) {
    if (project) {
      handleUpdateProject(values);
    } else {
      return handleNewProject(values);
    }
  }

  function handleCloseModal() {
    setEmailValue({
      value: "",
      error: "",
    });
    setEmails([]);
    onClose();
  }

  useEffect(() => {
    setEmails(project?.userEmails || []);
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal} size="lg">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>New Project</ModalHeader>
        <ModalCloseButton />
        <Divider />

        <ModalBody>
          <Stack>
            <Formik
              initialValues={{
                name: project?.name || "",
                description: project?.description || "",
                deadline: project?.deadline || "",
                created: new Date(
                  project?.created || Date.now()
                ).toLocaleDateString(),
              }}
              validate={validate}
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Stack gap={2}>
                    <Field name="name">
                      {({ field, form }) => (
                        <FormControl isRequired isInvalid={form.errors.name}>
                          <FormLabel>Project Name</FormLabel>
                          <Input {...field} />
                          <FormErrorMessage>
                            {form.errors.name}
                          </FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Flex gap={2}>
                      <Field name="created">
                        {({ field, form }) => (
                          <FormControl>
                            <FormLabel>Created at</FormLabel>
                            <Input {...field} type="text" readOnly />
                          </FormControl>
                        )}
                      </Field>

                      <Field name="deadline">
                        {({ field, form }) => (
                          <FormControl isRequired>
                            <FormLabel>Deadline at</FormLabel>
                            <Input {...field} type="date" />
                          </FormControl>
                        )}
                      </Field>
                    </Flex>
                    <Field name="description">
                      {({ field, form }) => (
                        <FormControl isRequired>
                          <FormLabel>Short description</FormLabel>
                          <Input {...field} type="text" />
                        </FormControl>
                      )}
                    </Field>
                    <FormControl>
                      <FormLabel>Add users</FormLabel>
                      <Input
                        type="text"
                        value={emailValue.value}
                        onChange={handleEmailChange}
                        onKeyDown={handleKeyDown}
                      />
                      <Text fontSize="sm" color="red">
                        {emailValue.error}
                      </Text>
                      <Flex flexWrap="wrap" gap={2} mt={2}>
                        {emails &&
                          emails.map((email, index) => (
                            <Box
                              bg="gray.100"
                              borderRadius={6}
                              p={2}
                              key={index}
                            >
                              <Text fontSize="sm">
                                {email}{" "}
                                <CloseIcon
                                  cursor="pointer"
                                  _hover={{
                                    color: "gray.500",
                                  }}
                                  fontSize="10px"
                                />{" "}
                              </Text>
                            </Box>
                          ))}
                      </Flex>
                    </FormControl>
                    <Flex my={"2"}>
                      <Button
                        colorScheme="teal"
                        type="submit"
                        isLoading={props.isSubmitting}
                        loadingText="Creating"
                      >
                        Create
                      </Button>
                      <Spacer />
                      <Button colorScheme="red" onClick={handleCloseModal}>
                        Cancel
                      </Button>
                    </Flex>
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProjectForm;
