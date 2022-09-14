import { useState } from "react";

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const resetError = () => {
    setError("");
  };

  const fetching = async (...params) => {
    try {
      setIsLoading(true);
      await callback(...params);
    } catch (e) {
      if (e.response.data.messages) {
        setError(e.response.data.messages.join());
      } else {
        setError(e.response.data.message);
      }
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  return [fetching, isLoading, error, resetError];
};
