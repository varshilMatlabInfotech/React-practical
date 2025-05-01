import { useState, useEffect } from "react";
import axiosInstance from "../constant";

function useApi({ url, payload = null, token = true }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    console.log(signal)

    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (payload === null) {
          response = await axiosInstance.get(url, { signal });
        } else {
          response = await axiosInstance.post(url, payload, { signal });
        }
        setData(response.data);
        setError(null);
      } catch (err) {
        if (axiosInstance.isCancel(err)) {
          console.log("Request canceled", err.message);
        } else if (err.name === "CanceledError") {
          console.log("Fetch aborted by user.");
        } else {
          setError(err);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, payload]);

  return { data, loading, error };
}

export default useApi;
