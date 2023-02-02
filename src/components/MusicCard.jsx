import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";
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
  Box,
  Spacer,
  IconButton,
} from "@chakra-ui/react";
import React, { useState } from "react";

let tracks = [
  {
    id: 1,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
  {
    id: 2,
    name: "rang lageya ishq da",
    artist: "Mohit Chauhan",
    playtime: "04:39",
  },
  {
    id: 3,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
  {
    id: 4,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
  {
    id: 5,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
  {
    id: 6,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
  {
    id: 7,
    name: "rockstar (feat. 21 Savage)",
    artist: "Post Malone",
    playtime: "04:39",
  },
];
const MusicCard = ({ playlistName }) => {
  const [currentTrack, setCurrentTrack] = useState(tracks[0]);

  return (
    <Card>
      <CardBody>
        <Heading size="md" color="gray.700">
          {playlistName}
        </Heading>
        <Stack mt="4" spacing="3">
          <Stack height="300px" overflowY="scroll">
            {tracks.map((track) => (
              <Box
                bg={currentTrack.id === track.id ? "gray.400" : "gray.100"}
                borderRadius={6}
                p={4}
                cursor="pointer"
                key={track.id}
                onClick={() => setCurrentTrack(track)}
              >
                <Flex>
                  <Stack>
                    <Text as="b" fontSize="md">
                      {track.name}
                    </Text>
                    <Text fontSize="md">{track.artist}</Text>
                  </Stack>
                  <Spacer />
                  <Text alignSelf="end">{track.playtime}</Text>
                </Flex>
              </Box>
            ))}
          </Stack>
          <Container minWidth="max-content">
            <Text color="blue.600" fontSize="lg" as="b" marginY={4}>
              {currentTrack.name}
            </Text>
            <Slider aria-label="slider-ex-1" defaultValue={30} marginY={2}>
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Flex gap={2}>
              <IconButton icon={<ArrowLeftIcon />} />
              <IconButton icon={<CheckIcon />} />

              <IconButton icon={<ArrowRightIcon />} />
            </Flex>
          </Container>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default MusicCard;
