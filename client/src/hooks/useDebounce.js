import { useEffect, useState } from "react";

export default function useDebounce(text, delay = 1000) {
  const [debouncedText, setDebouncedText] = useState(text);

  useEffect(
    function () {
      const timeout = setTimeout(() => {
        setDebouncedText(text);
      }, delay);

      return () => clearTimeout(timeout);
    },
    [text, delay]
  );

  return debouncedText;
}
