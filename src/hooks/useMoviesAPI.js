import React from 'react';
import useDebounce from './useDebounce';
import useIsMounted from './useIsMounted';

export const API_RESPONSE_VALUE = Object.freeze({
  NO_RESULTS: 'False',
  HAS_RESULTS: 'True',
});

export const REDUCER_ACTIONS = Object.freeze({
  SET_DATA: 'SET_DATA',
  SET_ERROR: 'SET_ERROR',
  START_FETCHING: 'START_FETCHING',
  FETCH_COMPLETED: 'FETCH_COMPLETED',
  FETCH_ERROR: 'FETCH_ERROR',
});

export const STATUS = Object.freeze({
  SUCCESS: 'SUCCESS',
  SUCCESS_EMPTY: 'SUCCESS_EMPTY',
  FETCHING: 'FETCHING',
  IDLE: 'IDLE',
  ERROR: 'ERROR',
});

function fetchReducer(state, action) {
  switch (action.type) {
    case REDUCER_ACTIONS.START_FETCHING:
      return {
        ...state,
        status: STATUS.FETCHING,
        errorMessage: '',
      };
    case REDUCER_ACTIONS.FETCH_COMPLETED:
      if (action.data.Response === API_RESPONSE_VALUE.HAS_RESULTS) {
        return {
          ...state,
          status: STATUS.SUCCESS,
          data: action.data,
          errorMessage: '',
        };
      }
      return {
        ...state,
        status: STATUS.SUCCESS_EMPTY,
        errorMessage: action.data.Error,
      };
    case REDUCER_ACTIONS.FETCH_ERROR:
      return {
        ...state,
        status: STATUS.ERROR,
        errorMessage: action.error,
      };
    default:
      return state;
  }
}

function getMovieURL({ searchQuery, movieId }) {
  const url = `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_IMDB_API_KEY}&type=movie`;
  if (movieId) {
    return `${url}&i=${movieId}`;
  }
  return `${url}&s=${searchQuery}`;
}

// it will return just the first 10 results. it needs pagination.
function useMoviesAPI({ searchQuery, movieId, initialData = {} }) {
  const [state, dispatch] = React.useReducer(fetchReducer, {
    status: STATUS.IDLE,
    data: initialData,
    errorMessage: '',
  });

  // avoid memory leak that happens if we try to update the state of an
  // unmounted component
  const isMounted = useIsMounted();

  // delay the API request my 350 ms so the user can type.
  // can be increased if it makes sense
  const debouncedQuery = useDebounce(searchQuery, 350);

  React.useEffect(() => {
    const movieTitle = debouncedQuery?.toLowerCase();

    const fetchUrl = getMovieURL({ searchQuery: movieTitle, movieId });

    function fetchMovie() {
      dispatch({ type: REDUCER_ACTIONS.START_FETCHING });
      window
        .fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
          if (isMounted) {
            dispatch({ type: REDUCER_ACTIONS.FETCH_COMPLETED, data: data });
          }
        })
        .catch(error => {
          if (isMounted) {
            dispatch({ type: REDUCER_ACTIONS.FETCH_ERROR, error });
          }
        });
    }

    if (movieTitle || movieId) {
      fetchMovie();
    }
  }, [debouncedQuery, movieId, isMounted]);

  return state;
}

export default useMoviesAPI;
