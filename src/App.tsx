import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FetchComponent } from "./components/apiClient/FetchComponent";
import { AxiosComponent } from "./components/apiClient/AxiosComponent";
import { SWRComponent } from "./components/apiClient/SWRComponent";
import { ReactQueryComponent } from "./components/apiClient/ReactQueryComponent";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <h1>Performance Comparison</h1>
        <FetchComponent />
        <AxiosComponent />
        <SWRComponent />
        <ReactQueryComponent />
      </div>
    </QueryClientProvider>
  );
};

export default App;
