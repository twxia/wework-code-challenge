import { useEffect } from 'react';
import { fromEvent } from 'rxjs';
import { throttleTime, filter } from 'rxjs/operators';

const useInfiniteScroll = ({ onReach, onClear, isLoading, threshold = 0.85 }) => {
  useEffect(() => {
    onReach();
    return onClear;
  }, []);

  useEffect(() => {
    const scroll$ = fromEvent(window, 'scroll')
      .pipe(
        throttleTime(150),
        filter(() => !isLoading)
      )
      .subscribe(() => {
        const scrollTopRatio = (window.innerHeight + document.documentElement.scrollTop) / document.documentElement.offsetHeight;
  
        if (scrollTopRatio > threshold) {
          onReach();
        }
      });
    return () => scroll$.unsubscribe();
  }, [isLoading]);
};

export default useInfiniteScroll;
