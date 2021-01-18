import * as React from 'react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { Link as ReactRouterLink } from 'react-router-dom';
import {
  Container,
  Heading,
  Center,
  IconButton,
  Icon,
  Box,
} from '@chakra-ui/react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { MdRemoveShoppingCart, MdShoppingCart } from 'react-icons/md';
import PropTypes from 'prop-types';

function Header({ hasMoviesInCart = false }) {
  const [showBackButton, setShowBackButton] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    setShowBackButton(location.pathname !== '/');
  }, [location.pathname]);

  return (
    <Container
      display="flex"
      as="header"
      transition="box-shadow 0.2s"
      position="sticky"
      top="0"
      zIndex="3"
      bg="white"
      borderBottom="0.5 solid"
      borderBottomColor="black"
      width="full"
      height="4.5rem"
      maxWidth="80em"
    >
      <Center opacity={0.8} width="100%">
        {showBackButton && (
          <IconButton
            display={{ lg: 'none' }} // hide on desktop
            variant="ghost"
            aria-label="Go to previous page"
            fontSize="2.5em"
            icon={<ChevronLeftIcon />}
            onClick={() => history.goBack()}
          />
        )}
        <Box mx="auto">
          <Link as={ReactRouterLink} to={`/`}>
            <Heading as="h1" size="lg">
              Fast Movies
            </Heading>
          </Link>
        </Box>
        <Link as={ReactRouterLink} to={`/checkout`}>
          <Icon
            variant="ghost"
            aria-label="Link to checkout page"
            fontSize="1.5em"
            as={hasMoviesInCart ? MdShoppingCart : MdRemoveShoppingCart}
          />
        </Link>
      </Center>
    </Container>
  );
}

Header.propTypes = {
  hasMoviesInCart: PropTypes.bool,
};

export default Header;
