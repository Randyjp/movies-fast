// @flow
import * as React from 'react';
import { useParams } from 'react-router-dom';
import useMoviesAPI, { STATUS } from '../hooks/useMoviesAPI';
import LoadingSpinner from './LoadingSpinner';
import MessageWithIcon from './MessageWithIcon';
import { WarningIcon } from '@chakra-ui/icons';
import { hasProperty } from '../utils';
import type { MoviesInCardType } from '../constants';

type MovieDetailsPropsType = {|
  moviesInCart: MoviesInCardType,
  children: React.Element<*>,
|};

function MovieDetails({
  children,
  moviesInCart,
}: MovieDetailsPropsType): React$Element<*> {
  const { movieId } = useParams();
  const { status, data: movie, errorMessage } = useMoviesAPI({ movieId });

  if ([STATUS.FETCHING, STATUS.IDLE].includes(status)) {
    return <LoadingSpinner />;
  }
  if ([STATUS.SUCCESS_EMPTY, STATUS.ERROR].includes(status)) {
    return (
      <MessageWithIcon
        Icon={<WarningIcon boxSize="2.5em" color="red.400" />}
        message={`${errorMessage} Please try again`}
      />
    );
  }
  if (status === STATUS.SUCCESS) {
    // if we are not sure how children looks we should validate that
    // it is just ONE valid element.
    return React.cloneElement(children, {
      movie,
      isMovieInCart: hasProperty(moviesInCart, movie?.imdbID),
    });
  }

  return (
    <MessageWithIcon
      Icon={<WarningIcon boxSize="2.5em" color="red.400" />}
      message={`Something went wrong. Please try again`}
    />
  );
}

export default MovieDetails;
