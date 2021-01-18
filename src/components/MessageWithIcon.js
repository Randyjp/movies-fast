import * as React from 'react';
import { Text, Center } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function MessageWithIcon({ message, Icon }) {
  return (
    <Center
      // take all viewport besides the 5.5em of the header and margin
      height="calc(100vh - 5.5em)"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      display="flex"
      flexDirection="column"
    >
      {Icon}
      <Text fontSize="lg" textAlign="center" marginTop={2}>
        {message}
      </Text>
    </Center>
  );
}

MessageWithIcon.propTypes = {
  message: PropTypes.string.isRequired,
  Icon: PropTypes.element.isRequired,
};

export default MessageWithIcon;
