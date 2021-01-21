//@flow
import * as React from 'react';
import {
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  Tag,
  TagLabel,
  AspectRatio,
} from '@chakra-ui/react';
import ActionButtons from './ActionButtons';
import { type MovieType } from '../constants';

type MovieCardPropType = {|
  movie: MovieType,
  addMovieToCart: (movie: MovieType) => void,
  deleteMovieFromCart: (movie: MovieType) => boolean,
  isMovieInCart?: boolean,
|};

function MovieCard({
  movie,
  addMovieToCart,
  deleteMovieFromCart,
  isMovieInCart = false,
}: MovieCardPropType): React$Element<*> {
  const {
    Plot,
    Title,
    Poster,
    Released,
    Rated,
    imdbRating,
    Genre = '',
  } = movie;
  return (
    <Flex
      maxWidth="50em"
      boxShadow="xl"
      padding={8}
      rounded="lg"
      bg="white"
      margin="auto"
    >
      <AspectRatio minWidth={300} ratio={9 / 16}>
        <Image
          objectFit="cover"
          src={Poster}
          alt={Title}
          rounded="md"
          fallbackSrc={`https://via.placeholder.com/300x463?text=${Title}`}
        />
      </AspectRatio>
      <Stack flex="1" alignItems="flex-end">
        <Heading
          as="h2"
          size="lg"
          borderBottom="2px solid"
          borderColor="gray.400"
          marginBottom={6}
        >
          Movie Profile
        </Heading>
        <Heading as="h3" size="xl" borderColor="gray400">
          {Title}
        </Heading>
        <Tag variant="solid" colorScheme="green">
          <TagLabel>{Rated}</TagLabel>
        </Tag>
        <Text>{`Released date: ${Released}`}</Text>
        <Flex marginBottom={12}>
          <Text fontWeight="bold">Rating:</Text>
          &nbsp;
          <Text>{`${imdbRating} / 10`}</Text>
        </Flex>
        <Text maxWidth="25em" noOfLines={4} marginBottom={16}>
          {Plot}
        </Text>
        <Flex width="100%" maxWidth="25em" marginBottom={6}>
          {Genre.split(', ').map((genre: string) => (
            <Tag marginRight={3} key={genre} variant="solid" colorScheme="teal">
              <TagLabel>{genre}</TagLabel>
            </Tag>
          ))}
        </Flex>
        <ActionButtons
          movie={movie}
          isMovieInCart={isMovieInCart}
          addMovie={addMovieToCart}
          deleteMovie={deleteMovieFromCart}
          showDetailsPageLink={false}
        />
      </Stack>
    </Flex>
  );
}

export default MovieCard;
