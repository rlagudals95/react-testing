import React, { useEffect, useState } from "react";
import axios from "axios";

export const AxiosComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        setData(response.data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        const end = performance.now();
        setLoading(false);
        setTime(end - start);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Axios</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {time !== null && <p>Time taken: {time.toFixed(2)} ms</p>}
    </div>
  );
};
