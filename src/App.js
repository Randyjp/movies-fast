import * as React from 'react';
import {
  ChakraProvider,
  theme,
  Container,
  useBreakpointValue,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import MovieCheckout from './components/MovieCheckout';
import MobileMovieCard from './components/MobileMovieCard';
import MovieCard from './components/MovieCard';
import Header from './components/Header';
import createPersistedState from 'use-persisted-state';
import { hasProperty } from './utils';

// moviesInCart is the key used to store the movie state in local storage
const useMoviesInCartState = createPersistedState('moviesInCart');

function App() {
  const displayMobileCard = useBreakpointValue({
    base: true,
    lg: false,
  });
  const [moviesInCart, setMoviesInCart] = useMoviesInCartState({});

  function handleAddMovieToCart(movie) {
    if (movie && !hasProperty(moviesInCart, movie?.imdbID)) {
      // we don't need to store all the movie info, just title and id.
      const { imdbID, Title } = movie;
      const newMoviesInCart = {
        ...moviesInCart,
        [imdbID]: { imdbID, Title },
      };
      setMoviesInCart(newMoviesInCart);
    }
  }

  function handleRemoveMovieFromCart(movie) {
    if (movie && hasProperty(moviesInCart, movie?.imdbID)) {
      const newMoviesInCart = { ...moviesInCart };
      delete newMoviesInCart[movie.imdbID];
      setMoviesInCart(newMoviesInCart);
      return true;
    }
    return false;
  }

  return (
    <React.Fragment>
      <Header hasMoviesInCart={Object.keys(moviesInCart).length > 0} />
      <Container as="main" maxWidth="80em" marginTop={4}>
        <Switch>
          <Route path="/movie/:movieId">
            <MovieDetails moviesInCart={moviesInCart}>
              {/* compose movie details' children so we can avoid "prop drilling" functions */}
              {displayMobileCard ? (
                <MobileMovieCard
                  addMovieToCart={handleAddMovieToCart}
                  deleteMovieFromCart={handleRemoveMovieFromCart}
                />
              ) : (
                <MovieCard
                  addMovieToCart={handleAddMovieToCart}
                  deleteMovieFromCart={handleRemoveMovieFromCart}
                />
              )}
            </MovieDetails>
          </Route>
          <Route path="/checkout">
            <MovieCheckout
              moviesInCart={moviesInCart}
              deleteMovieFromCart={handleRemoveMovieFromCart}
              cleanCart={() => setMoviesInCart({})}
            />
          </Route>
          <Route path="/">
            <MovieSearch
              movieIdsInCart={moviesInCart}
              addMovieToCart={handleAddMovieToCart}
              deleteMovieFromCart={handleRemoveMovieFromCart}
            />
          </Route>
        </Switch>
      </Container>
    </React.Fragment>
  );
}

function AppWithProviders() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  );
}

export default AppWithProviders;
