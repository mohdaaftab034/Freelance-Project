import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Event Foundation`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
