import {
  Box,
  Center,
  SimpleGrid,
  Text,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useGetPlaylistsQuery } from "../services/musicApi";
import MusicCard from "./MusicCard";

const Music = () => {
  const {data, isFetching} = useGetPlaylistsQuery();
  // const [playlists, setPlaylists] = useState([]);

  if (isFetching) return 'Loading';
  const playlists = data?.playlists?.items;
  console.log(playlists);
  return (
    <Box>
      <Text fontSize="xl" as="b">
        Music
      </Text>
      <Grid
      mt={2}
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(6, 1fr)"
        gap={4}
      >
        {
          playlists.slice(0,4).map((playlist, index) => (
            <GridItem colSpan={1}>
              <Image w='300px' h='200px' borderRadius={7} objectFit='cover' cursor='pointer'src={playlist.data.images.items[0].sources[0].url} />
            </GridItem>
          ))
        }
        <GridItem rowSpan={2} colSpan={2}>
          <MusicCard />
        </GridItem>

        {
          playlists.slice(4).map((playlist, index) => (
             <GridItem colSpan={1}>
              <Image objectFit='cover' w='300px' h='200px' borderRadius={7} cursor='pointer' src={playlist.data.images.items[0].sources[0].url} />
            </GridItem>
          ))
        }
      </Grid>
    </Box>
  );
};

export default Music;
