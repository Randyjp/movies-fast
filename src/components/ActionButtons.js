import * as React from 'react';
import { Link as ReactRouterLink } from 'react-router-dom';
import { Button, ButtonGroup, Link, useToast } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function ActionButtons({
  movie,
  isMovieInCart,
  addMovie,
  deleteMovie,
  showDetailsPageLink = true,
}) {
  const toast = useToast();

  function showToast(title = 'Toast Title', status = 'success') {
    return toast({
      status,
      title,
      duration: 2000,
      isClosable: true,
    });
  }

  return (
    <ButtonGroup
      variant="outline"
      spacing="6"
      display="flex"
      justifyContent="center"
    >
      {!isMovieInCart ? (
        <Button
          colorScheme="blue"
          onClick={() => {
            addMovie(movie);
            showToast('Boom! New movie added to cart');
          }}
          isFullWidth={!showDetailsPageLink}
        >
          Add to Cart
        </Button>
      ) : (
        <Button
          colorScheme="red"
          onClick={() => {
            deleteMovie(movie);
            showToast('Done! The movie was removed', 'warning');
          }}
          isFullWidth={!showDetailsPageLink}
        >
          Remove from Cart
        </Button>
      )}
      {showDetailsPageLink && (
        <Link as={ReactRouterLink} to={`/movie/${movie.imdbID}`}>
          <Button>Go to Movie Page</Button>
        </Link>
      )}
    </ButtonGroup>
  );
}

ActionButtons.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    imdbID: PropTypes.string.isRequired,
  }),
  isMovieInCart: PropTypes.bool.isRequired,
  addMovie: PropTypes.func,
  deleteMovie: PropTypes.func,
  showDetailsPageLink: PropTypes.bool,
};

export default ActionButtons;
