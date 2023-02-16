import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useVerifyMutation } from "../services/userAccessApi";
import { getToastObject } from "../utils/helper";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [otp, setOtp] = useState("");
  const { email } = useParams();

  const [verify, { isLoading, isSuccess }] = useVerifyMutation();

  function verifyOtp() {
    console.log("verifying now");
    verify({ email, otp })
      .unwrap()
      .then((payload) => {
        const toastConfig = getToastObject(
          "Verification success",
          "Your account has been verified. Please login",
          "success",
          6000
        );
        toast(toastConfig);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch((error) => {
        console.error(`Verification failed due to: ${error.message}`);
        const toastConfig = getToastObject(
          "Verification failure",
          "Please ensure the OTP is correct",
          "failure",
          6000
        );
        toast(toastConfig);
      });
  }
  return (
    <div>
      <Container mt={10} w={500}>
        <Text fontSize="xl" fontWeight={700}>
          Verify your account
        </Text>
        <Text mb={3} fontSize="sm" color="gray.700">
          One time password has been sent to <u>{email}</u>
        </Text>
        <Box p={6} borderRadius={"lg"} borderWidth={"1px"}>
          <Stack>
            <FormControl>
              <FormLabel>Please enter the OTP</FormLabel>
              <Input
                type="text"
                maxLength="6"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <Button
                mt={3}
                w="full"
                colorScheme={"teal"}
                onClick={() => {
                  verifyOtp();
                }}
              >
                Verify
              </Button>
            </FormControl>
          </Stack>
        </Box>
        <Link to="/access">
          <Text
            fontSize="sm"
            mt={2}
            color="gray.800"
            cursor="pointer"
            _hover={{ color: "teal.600" }}
          >
            <ArrowBackIcon /> Change email?
          </Text>
        </Link>
      </Container>
    </div>
  );
};

export default VerifyAccount;
