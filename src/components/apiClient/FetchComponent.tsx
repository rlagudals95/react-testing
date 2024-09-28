import React, { useEffect, useState } from "react";

export const FetchComponent: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [time, setTime] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const start = performance.now();
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos/1"
        );
        if (!response.ok) throw new Error("Network response was not ok");
        const result = await response.json();
        setData(result);
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
      <h2>Fetch API</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {time !== null && <p>Time taken: {time.toFixed(2)} ms</p>}
    </div>
  );
};
