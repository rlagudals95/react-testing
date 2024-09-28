import React from "react";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

export const SWRComponent: React.FC = () => {
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos/1",
    fetcher
  );
  const time = performance.now();

  return (
    <div>
      <h2>SWR</h2>
      {error && <p>Error: {error.message}</p>}
      {!data ? <p>Loading...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      <p>Time taken: {time.toFixed(2)} ms</p>
    </div>
  );
};
