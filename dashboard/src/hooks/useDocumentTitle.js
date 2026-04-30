import { useEffect } from 'react';

const useDocumentTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | Admin Dashboard`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default useDocumentTitle;
