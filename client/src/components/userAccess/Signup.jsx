import React from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../services/userAccessApi";
import { getToastObject } from "../../utils/helper";

const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8) {
    errors.password = "Please choose a strong password";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Password must match";
  }
  return errors;
};

const Signup = ({ setShowForm }) => {
  const toast = useToast();
  const navigate = useNavigate();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  function handleSubmit(values) {
    console.log("signup values: ", values);
    signup(values)
      .unwrap()
      .then((payload) => {
        console.log("response: ", payload);
        const toastConfig = getToastObject(
          "We've created account for you",
          "A verification code has been sent to you",
          "success",
          6000
        );
        toast(toastConfig);
        setTimeout(() => {
          navigate(`/verify-email/${values.email}`);
        }, 3000);
      })
      .catch((error) => {
        console.error("Signup failed: ", error.message);
      });
  }

  return (
    <div>
      <Container mt={10}>
        <Text marginY={3} fontWeight={700} fontSize="xl">
          Create your account
        </Text>
        <Box borderRadius="lg" borderWidth="1px" p={6}>
          <Stack>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              validate={validate}
              onSubmit={(values, actions) => {
                handleSubmit(values);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="firstName">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.firstName && form.touched.firstName
                        }
                      >
                        <FormLabel>First Name</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.firstName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="lastName">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.lastName && form.touched.lastName
                        }
                      >
                        <FormLabel>Last Name</FormLabel>
                        <Input {...field} />
                        <FormErrorMessage>
                          {form.errors.lastName}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <FormLabel>Email address</FormLabel>
                        <Input {...field} type="email" />
                        <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                        <FormErrorMessage>
                          {form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isRequired
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <FormLabel>Confirm password</FormLabel>
                        <Input {...field} type="password" />
                        <FormErrorMessage>
                          {form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    mt={3}
                    w="full"
                    colorScheme="teal"
                    type="submit"
                    isLoading={props.isSubmitting}
                  >
                    Create
                  </Button>
                </Form>
              )}
            </Formik>
          </Stack>
          <HStack mt={2} fontSize="sm">
            <Text>Already have an account?</Text>
            <Text as="b" cursor="pointer" onClick={() => setShowForm("login")}>
              Log in
            </Text>
          </HStack>
        </Box>
      </Container>
    </div>
  );
};

export default Signup;
