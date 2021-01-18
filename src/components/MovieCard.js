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
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';

function MovieCard({
  movie,
  addMovieToCart,
  deleteMovieFromCart,
  isMovieInCart = false,
}) {
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
        <Flex
          justifyContent="space-between"
          width="100%"
          maxWidth="25em"
          marginBottom={6}
        >
          {Genre.split(', ').map(genre => (
            <Tag key={genre} variant="solid" colorScheme="teal">
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

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Rated: PropTypes.string.isRequired,
    Released: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
  }),
  deleteMovieFromCart: PropTypes.func.isRequired,
  addMovieToCart: PropTypes.func.isRequired,
  isMovieInCart: PropTypes.bool,
};

export default MovieCard;
