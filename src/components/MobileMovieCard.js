import * as React from 'react';
import {
  Heading,
  Image,
  Stack,
  Text,
  Flex,
  Tag,
  TagLabel,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import ActionButtons from './ActionButtons';

function MobileMovieCard({
  movie,
  addMovieToCart,
  deleteMovieFromCart,
  isMovieInCart = false,
}) {
  const { Plot, Title, Poster, Rated, imdbRating, Year } = movie;
  return (
    <Stack maxWidth="sm" borderRadius="lg" margin="auto">
      <Heading>{Title}</Heading>
      <Image
        src={Poster}
        alt={Title}
        marginBottom={2}
        fallbackSrc={`https://via.placeholder.com/300x463?text=${Title}`}
      />
      <Flex justifyContent="space-around" marginBottom={2}>
        <Flex marginRight={4}>
          <Text fontSize="sm" fontWeight="bold">
            Year:
          </Text>
          &nbsp;
          <Text fontSize="sm">{Year}</Text>
        </Flex>
        <Flex marginRight={4}>
          <Text fontSize="sm" fontWeight="bold">
            Rating:
          </Text>
          &nbsp;
          <Text fontSize="sm">{`${imdbRating}/10`}</Text>
        </Flex>
        <Tag variant="solid" colorScheme="green">
          <TagLabel>{Rated}</TagLabel>
        </Tag>
      </Flex>
      <Text marginBottom={8}>{Plot}</Text>
      <ActionButtons
        movie={movie}
        isMovieInCart={isMovieInCart}
        addMovie={addMovieToCart}
        deleteMovie={deleteMovieFromCart}
        showDetailsPageLink={false}
      />
    </Stack>
  );
}

MobileMovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
    Plot: PropTypes.string.isRequired,
    Poster: PropTypes.string.isRequired,
    Rated: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    imdbRating: PropTypes.string.isRequired,
  }),
  deleteMovieFromCart: PropTypes.func.isRequired,
  addMovieToCart: PropTypes.func.isRequired,
  isMovieInCart: PropTypes.bool,
};

export default MobileMovieCard;
