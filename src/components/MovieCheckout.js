import * as React from 'react';
import {
  List,
  ListItem,
  ListIcon,
  Text,
  IconButton,
  Button,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerHeader,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  CheckCircleIcon,
  PlusSquareIcon,
  DeleteIcon,
  CheckIcon,
} from '@chakra-ui/icons';
import ActionButtons from './ActionButtons';
import PropTypes from 'prop-types';
import MessageWithIcon from './MessageWithIcon';

const CHECKOUT_STATUS = Object.freeze({
  IDLE: 'IDLE',
  SUCCESS: 'SUCCESS',
  STARTED: 'STARTED',
});

function CheckoutFlowButtons({ checkoutStatus, setCheckoutStatus }) {
  if (checkoutStatus === CHECKOUT_STATUS.IDLE) {
    return (
      <Button
        colorScheme="blue"
        isFullWidth
        size="lg"
        onClick={() => setCheckoutStatus(CHECKOUT_STATUS.STARTED)}
      >
        Checkout
      </Button>
    );
  }
  if (checkoutStatus === CHECKOUT_STATUS.STARTED) {
    return (
      <ButtonGroup spacing="6" display="flex" justifyContent="center">
        <Button
          colorScheme="red"
          isFullWidth
          size="lg"
          onClick={() => setCheckoutStatus(CHECKOUT_STATUS.IDLE)}
        >
          Cancel
        </Button>
        <Button
          colorScheme="green"
          isFullWidth
          size="lg"
          onClick={() => setCheckoutStatus(CHECKOUT_STATUS.SUCCESS)}
        >
          Confirm!
        </Button>
      </ButtonGroup>
    );
  }
}

function MovieCheckout({ moviesInCart = {}, deleteMovieFromCart, cleanCart }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMovieId, setSelectedMovieId] = React.useState();
  const [checkoutStatus, setCheckoutStatus] = React.useState(
    CHECKOUT_STATUS.IDLE
  );
  // if this becomes a problem we can memoize it. I don't think it will be a problem tho
  const moviesArray = Object.keys(moviesInCart);

  React.useEffect(() => {
    // open drawer when we select a movie
    if (selectedMovieId) {
      onOpen();
    }
  }, [selectedMovieId, onOpen]);

  React.useEffect(() => {
    // clean movie selection when we close the drawer
    if (!isOpen) {
      setSelectedMovieId(null);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (checkoutStatus === CHECKOUT_STATUS.SUCCESS && moviesArray.length > 0) {
      cleanCart();
    }
  }, [checkoutStatus, cleanCart, moviesArray]);

  function handleRemoveMovie(movie) {
    deleteMovieFromCart(movie);
    // Same comment as line 52 in MovieSearch
    onClose();
  }

  if (moviesArray.length === 0 && checkoutStatus !== CHECKOUT_STATUS.SUCCESS) {
    return (
      <MessageWithIcon
        Icon={<PlusSquareIcon boxSize="2.5em" color="green.400" />}
        message="Your cart is empty! Please add some movies and come back"
      />
    );
  }

  if (checkoutStatus === CHECKOUT_STATUS.SUCCESS) {
    return (
      <MessageWithIcon
        Icon={<CheckIcon boxSize="2.5em" color="green.400" />}
        message="You all set. Thank you!"
      />
    );
  }

  return (
    <React.Fragment>
      <List spacing={4} marginBottom={8}>
        {moviesArray.map(movieId => (
          <ListItem
            key={movieId}
            display="flex"
            justifyItems="center"
            alignItems="center"
          >
            <ListIcon as={CheckCircleIcon} color="green.500" />
            <Text fontSize="xl" maxWidth="16rem" marginRight="auto" isTruncated>
              {moviesInCart[movieId].Title}
            </Text>
            <IconButton
              colorScheme="red"
              aria-label={`Remove ${moviesInCart[movieId].Title} from cart button`}
              size="xs"
              icon={<DeleteIcon />}
              onClick={() => setSelectedMovieId(movieId)}
            />
          </ListItem>
        ))}
      </List>
      <CheckoutFlowButtons
        checkoutStatus={checkoutStatus}
        setCheckoutStatus={setCheckoutStatus}
      />
      {/*  Drawer should be a re-usable component, similar usage in movieSearch */}
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px" textAlign="center">
              {selectedMovieId?.Title}
            </DrawerHeader>
            <DrawerBody paddingX={4} paddingY={8}>
              <ActionButtons
                isMovieInCart
                movie={moviesInCart[selectedMovieId]}
                deleteMovie={handleRemoveMovie}
                showDetailsPageLink={false}
              />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </React.Fragment>
  );
}

MovieCheckout.propTypes = {
  moviesInCart: PropTypes.objectOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      imdbID: PropTypes.string.isRequired,
    })
  ),
  deleteMovieFromCart: PropTypes.func.isRequired,
  cleanCart: PropTypes.func.isRequired,
};

CheckoutFlowButtons.propTypes = {
  checkoutStatus: PropTypes.oneOf([
    CHECKOUT_STATUS.STARTED,
    CHECKOUT_STATUS.STARTED,
    CHECKOUT_STATUS.IDLE,
  ]),
  setCheckoutStatus: PropTypes.func.isRequired,
};

export default MovieCheckout;
