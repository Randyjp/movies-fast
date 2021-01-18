import * as React from 'react';
import { Center, Spinner } from '@chakra-ui/react';

function LoadingSpinner() {
  return (
    <Center
      // take all viewport besides the 5.5em of the header and margin
      height="calc(100vh - 5.5em)"
    >
      <Spinner
        thickness="0.375em"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
        label="Loading movies..."
      />
    </Center>
  );
}

export default LoadingSpinner;
