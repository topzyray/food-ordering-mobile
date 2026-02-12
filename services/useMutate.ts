import { useState } from "react";

const useMutate = <T>(mutateFunction: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await mutateFunction();
      setData(result);
    } catch (error) {
      // @ts-ignore
      setError(error instanceof Error ? error : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutate };
};

export { useMutate };
