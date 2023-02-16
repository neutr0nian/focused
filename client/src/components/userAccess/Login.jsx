import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useLoginMutation } from "../../services/userAccessApi";
import { useNavigate } from "react-router-dom";

//validation
const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Required";
  }
  return errors;
};

const Login = ({ setShowForm }) => {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, isFetching }] = useLoginMutation();

  useEffect(() => {
    if (isSuccess) navigate("/");
  }, [isSuccess]);

  return (
    <div>
      <Container mt={10}>
        <Text marginY={3} fontWeight={700} fontSize="xl">
          Login to your account
        </Text>
        <Box borderRadius="lg" borderWidth="1px" p={6}>
          <Stack>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validate={validate}
              onSubmit={(values, actions) => {
                login(values)
                  .unwrap()
                  .then((payload) => {
                    console.log(payload);
                    localStorage.setItem("token", payload.accessToken);
                  })
                  .catch((error) => console.log(error));
              }}
            >
              {(props) => (
                <Form>
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
                      <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input {...field} type="password" />
                      </FormControl>
                    )}
                  </Field>
                  <Text
                    marginY={2}
                    color={"gray.600"}
                    fontSize="xs"
                    cursor="pointer"
                  >
                    Forgot Password?
                  </Text>
                  <Button
                    mt={3}
                    w="full"
                    colorScheme="teal"
                    isLoading={isLoading}
                    type="submit"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </Stack>
          <HStack mt={2} fontSize="sm">
            <Text>Create an account?</Text>
            <Text as="b" cursor="pointer" onClick={() => setShowForm("signup")}>
              Sign up
            </Text>
          </HStack>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
