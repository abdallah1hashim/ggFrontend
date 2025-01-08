import { useSearchParams } from "react-router-dom";

export function useSearchParamsHandler() {
  const [searchParams, setSearchParams] = useSearchParams();
  function handleParams(query: string, value: string | number) {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set(query, String(value));
      return updated;
    });
  }
  return { searchParams, handleParams };
}
