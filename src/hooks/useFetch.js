import { useState, useEffect } from "react";
import axios from "./endPoint";
const useFetch = (url, conf) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let ignore = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, conf);
        if (!ignore) setData(res.data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetchData();
    return () => {
      ignore = true;
    };
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
