import {
  Card,
  CardBody,
  Text,
  Heading,
  Stack,
  Button,
  Image,
  Center,
  Slider,
  SliderThumb,
  SliderTrack,
  SliderFilledTrack,
  Container,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const MusicCard = () => {
  return (
      <Card>
        <CardBody>
          <Heading size="md">Currently Playing</Heading>
          <Stack mt="4" spacing="3">
            <Image
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              alt="Green double couch with wooden legs"
              borderRadius="lg"
            />
            <Container minWidth="max-content">
              <Text color="blue.600" fontSize="lg" as="b">
                Song name
              </Text>
              <Slider aria-label="slider-ex-1" defaultValue={30}>
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
              <Flex gap={2}>
                <Button>B</Button>
                <Button>P</Button>
                <Button>F</Button>
              </Flex>
            </Container>
          </Stack>
        </CardBody>
      </Card>
  );
};

export default MusicCard;
