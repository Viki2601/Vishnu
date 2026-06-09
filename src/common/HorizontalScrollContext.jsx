'use client';
import { createContext, useContext } from 'react';

export const HorizontalScrollContext = createContext({
  scrollProgress: 0,
  scrollToPanel: () => {},
  isHorizontal: false,
  containerAnimation: null,
});

export const useHorizontalScroll = () => useContext(HorizontalScrollContext);
