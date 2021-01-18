import * as React from 'react';

function useIsMounted() {
  const isMounted = React.useRef(false);

  React.useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
    return () => (isMounted.current = false);
  }, []);
  return isMounted.current;
}

export default useIsMounted;
