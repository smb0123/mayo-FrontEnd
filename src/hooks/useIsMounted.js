import { useEffect } from 'react';

export default function useIsMounted(setFuntion) {
  useEffect(() => {
    setFuntion(true);

    return () => setFuntion(false);
  }, [setFuntion]);
}
