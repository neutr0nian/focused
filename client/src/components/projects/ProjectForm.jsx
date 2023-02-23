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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import {
  useCreateProjectMutation,
  useUpdateProjectMutation,
} from "../../services/projectsApi";
import { addProject, editProject, setProjects } from "./projectSlice";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 35) {
    errors.name = "Name too long";
  }

  return errors;
};

const ProjectForm = ({ project, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

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
      console.log("calling add");
      return handleNewProject(values);
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
                  project?.created || null
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
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl isRequired isInvalid={form.errors.name}>
                        <FormLabel>Project Name</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Flex gap={2}>
                    <Field name="created">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>Created at</FormLabel>
                          <Input {...field} type="text" />
                        </FormControl>
                      )}
                    </Field>

                    <Field name="deadline">
                      {({ field, form }) => (
                        <FormControl>
                          <FormLabel>Deadline at</FormLabel>
                          <Input {...field} type="text" />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Field name="description">
                    {({ field, form }) => (
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Input {...field} type="text" />
                      </FormControl>
                    )}
                  </Field>
                  <Flex my={"2"}>
                    <Button
                      colorScheme="teal"
                      type="submit"
                      isLoading={props.isSubmitting}
                      loadingText="Creating"
                    >
                      Add
                    </Button>
                    <Spacer />
                    <Button colorScheme="red" onClick={onClose}>
                      Cancel
                    </Button>
                  </Flex>
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
