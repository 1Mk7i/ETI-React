import { useState, useEffect } from "react";

export const useFetch = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`Помилка HTTP: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err: any) {
        if (err.name === "AbortError") {
          console.log("Запит скасовано");
        } else {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};