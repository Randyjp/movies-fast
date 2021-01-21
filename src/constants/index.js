//@flow
export type MovieType = {|
  Title: string,
  imdbID: string,
  Plot: string,
  Poster: string,
  Rated: string,
  Released: string,
  Genre?: string,
  imdbRating: string,
|};

export type MoviesInCardType = {|
  [string]: {
    Title: string,
    imdbID: string,
  },
|};
