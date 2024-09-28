import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const fetchTodo = async (setFetchTime: (time: number) => void) => {
  const start = performance.now(); // API 호출 시점에서 시작
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!response.ok) throw new Error("Network response was not ok");
  const data = await response.json();
  const end = performance.now(); // API 호출 완료 시점에서 끝
  setFetchTime(end - start); // 소요 시간을 계산하여 상태에 저장

  return data;
};

export const ReactQueryComponent: React.FC = () => {
  const [fetchTime, setFetchTime] = useState<number | null>(null); // 소요 시간을 저장할 상태

  const { data, error, isLoading } = useQuery({
    queryKey: ["todo"],
    queryFn: () => fetchTodo(setFetchTime), // fetchTodo에 setFetchTime을 전달
  });

  useEffect(() => {
    // API 호출이 완료된 후 소요 시간을 리셋합니다.
    if (!isLoading && (data || error)) {
      setFetchTime(null);
    }
  }, [isLoading, data, error]);

  return (
    <div>
      <h2>React Query</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {(error as Error).message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      {fetchTime !== null && <p>Time taken: {fetchTime.toFixed(2)} ms</p>}{" "}
    </div>
  );
};
