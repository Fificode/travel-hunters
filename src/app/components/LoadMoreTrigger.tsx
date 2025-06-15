import React, {useEffect, useRef} from 'react'

const LoadMoreTrigger = ({ onLoadMore }: { onLoadMore: () => void }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onLoadMore();
      }
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [onLoadMore]);

  return <div ref={ref} className="h-10" />;
};

export default LoadMoreTrigger