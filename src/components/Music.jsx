import {
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  Container,
  Select,
} from "@chakra-ui/react";
import React, { useState } from "react";
import MusicCard from "./MusicCard";

const Music = () => {
  const [searchText, setSearchText] = useState("study music");
  //   const {data, isFetching} = useGetPlaylistsQuery(searchText);

  // const [playlists, setPlaylists] = useState([]);

  let playlists = [];
  //   if (isFetching) return "Loading";
  //   playlists = data?.playlists?.items;

  console.log("playlists: ", playlists);

  const handleChange = (e) => {
    setSearchText(e.target.value);
    // playlists = result?.playlists?.items;
  };

  const handleSearch = () => {
    trigger(searchText);
  };

  return (
    <Box>
      <Text fontSize="xl" as="b">
        Music
      </Text>
      <Container>
        <Select
          bg="white"
          mb="4"
          placeholder={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        >
          <option value="work music">Work </option>
          <option value="study music">Study </option>
          <option value="lofi music">Lofi</option>
          <option value="peace music">Peace</option>
          <option value="meditation music">Meditation</option>
          <option value="piano music">Piano</option>
          <option value="space music">Space</option>
        </Select>
      </Container>
      <Grid
        mt={2}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        {playlists.slice(0, 4).map((playlist, index) => (
          <GridItem colSpan={1} key={index}>
            <Image
              w="300px"
              h="200px"
              borderRadius={7}
              objectFit="cover"
              cursor="pointer"
              src={playlist.data.images.items[0].sources[0].url}
            />
          </GridItem>
        ))}
        <GridItem rowSpan={2} colSpan={2}>
          <MusicCard playlistName={searchText} />
        </GridItem>

        {playlists.slice(4).map((playlist, index) => (
          <GridItem colSpan={1} key={index}>
            <Image
              objectFit="cover"
              w="300px"
              h="200px"
              borderRadius={7}
              cursor="pointer"
              src={playlist.data.images.items[0].sources[0].url}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Music;
