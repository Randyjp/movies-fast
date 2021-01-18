import * as React from 'react';
import useMoviesAPI, { STATUS } from '../hooks/useMoviesAPI';
import { SearchIcon, WarningTwoIcon } from '@chakra-ui/icons';
import ActionButtons from './ActionButtons';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Grid,
  Image,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  Center,
  AspectRatio,
} from '@chakra-ui/react';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types';
import { useQueryAsState } from 'use-route-as-state';
import MessageWithIcon from './MessageWithIcon';
import { hasProperty } from '../utils';

function MovieSearch({ movieIdsInCart, addMovieToCart, deleteMovieFromCart }) {
  const [{ query = '' }, updateQueryParams] = useQueryAsState();
  const [selectedMovie, setSelectedMovie] = React.useState();
  const { status, data: movies } = useMoviesAPI({ searchQuery: query });
  const { isOpen, onOpen, onClose } = useDisclosure();

  React.useEffect(() => {
    if (!isOpen) {
      setSelectedMovie(null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (selectedMovie) {
      onOpen();
    }
  }, [selectedMovie, onOpen]);

  function handleChange(event) {
    updateQueryParams({ query: event.target.value });
  }

  function handleAddMovie(movie) {
    if (movie) {
      addMovieToCart(movie);
      // there's a catch here! Some might consider that we should not close the drawer
      // until the state(we don't know at this point). Others might argue that we have called
      // the updater function, so it's time to close the drawer and let the parent component handle any errors.
      // Calling it here it's easier; in a bigger application, we should consider other
      // implementations.
      onClose();
    }
  }

  function handleRemoveMovie(movie) {
    if (movie) {
      deleteMovieFromCart(movie);
      // Same comment as line 52.
      onClose();
    }
  }

  return (
    <React.Fragment>
      <Box marginBottom={8}>
        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="search"
            value={query}
            onChange={handleChange}
            errorBorderColor="red.500"
            placeholder="Search movies by title"
            isInvalid={status === STATUS.SUCCESS_EMPTY}
          />
        </InputGroup>
      </Box>
      {status === STATUS.FETCHING && <LoadingSpinner />}
      {status === STATUS.SUCCESS_EMPTY && (
        <MessageWithIcon
          Icon={<SearchIcon boxSize="2.5em" color="gray.400" />}
          message="We could not find any movies which match that title. Start a new search to view more!"
        />
      )}
      {status === STATUS.ERROR && (
        <MessageWithIcon
          Icon={
            <WarningTwoIcon
              boxSize="2.5em"
              color="red.400"
              textAlign="center"
            />
          }
          message="Oops! Something went wrong on our side. Please refresh the page or try again."
        />
      )}
      {status === STATUS.SUCCESS && (
        <Grid
          templateColumns="repeat(auto-fit, minmax(19rem, 1fr))"
          gap={4}
          autoRows="1fr"
        >
          {movies.Search.map(movie => (
            <Center
              onClick={() => {
                setSelectedMovie(movie);
              }}
              key={movie.imdbID}
            >
              <AspectRatio minWidth={300} ratio={9 / 16}>
                <Image
                  objectFit="cover"
                  src={movie.Poster}
                  alt={movie.Title}
                  cursor="pointer"
                  boxShadow={
                    hasProperty(movieIdsInCart, movie?.imdbID)
                      ? 'outline'
                      : 'dark-lg'
                  }
                  p={1}
                  rounded="md"
                  fallbackSrc={`https://via.placeholder.com/300x463?text=${movie.Title}`}
                />
              </AspectRatio>
            </Center>
          ))}
        </Grid>
      )}
      {/*  Drawer should be a re-usable component, similar usage in movieCheckout */}
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px" textAlign="center">
              {selectedMovie?.Title}
            </DrawerHeader>
            <DrawerBody paddingX={4} paddingY={8}>
              <ActionButtons
                movie={selectedMovie}
                isMovieInCart={hasProperty(
                  movieIdsInCart,
                  selectedMovie?.imdbID
                )}
                addMovie={handleAddMovie}
                deleteMovie={handleRemoveMovie}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  );
}

MovieSearch.propTypes = {
  movieIdsInCart: PropTypes.objectOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
    })
  ),
  deleteMovieFromCart: PropTypes.func.isRequired,
  addMovieToCart: PropTypes.func.isRequired,
};

export default MovieSearch;
