import { useEffect, useState } from 'react'

export const useMediaQuery = query => {
  const mediaMatch = window.matchMedia(query)
  const [matches, setMatches] = useState(mediaMatch.matches)

  useEffect(() => {
    const handler = e => setMatches(e.matches)
    mediaMatch.addListener(handler)
    return () => mediaMatch.removeListener(handler)
  })
  return matches
}

/**
 * EXAMPLE
 * 
import React from 'react';
import {useMediaQuery} from './hooks';

export const MyComponent = () => {
  const isRowBased = useMediaQuery('(min-width: 500px)');
  
  return (
    <div style={styles.container(isRowBased)}>
      <div>First item</div>
      <div>Second item</div>
    </div>);
};

const styles = {
  container: isRowBased => ({
    display: 'flex',
    flexDirection: isRowBased ? 'row' : 'column',
    justifyContent: 'space-around'
  })
};

*/
