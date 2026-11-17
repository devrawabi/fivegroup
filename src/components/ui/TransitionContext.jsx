import { createContext, useContext } from 'react';

export const TransitionContext = createContext({
  navigateWithTransition: () => {},
  isTransitioning: false,
});

export const usePageTransition = () => useContext(TransitionContext);

