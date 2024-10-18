import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollToTop = (pages) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pages.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname, pages]);

  return null;
};

export default useScrollToTop;
