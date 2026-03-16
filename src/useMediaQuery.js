import { useState, useEffect } from "react";

function useMediaQuery(query) {
  const getMatch = () => window.matchMedia(query).matches;

  const [matches, setMatches] = useState(getMatch);

  useEffect(() => {
    const media = window.matchMedia(query);

    const listener = (event) => {
      setMatches(event.matches);
    };

    media.addEventListener("change", listener);

    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
