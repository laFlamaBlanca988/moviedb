import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalProvider } from "contexts/GlobalContext";
import ContentPage from "pages/ContentPage";
import AppLayout from "layouts/AppLayout";
import NotFoundPage from "pages/NotFoundPage";
import DetailsPage from "pages/DetailsPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <Router>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Navigate to="/shows" />} />
            <Route path="movies" element={<ContentPage type="movies" />} />
            <Route
              path="movies/:query"
              element={<ContentPage type="moviesSearch" />}
            />
            <Route
              path="movie/:movieId"
              element={<DetailsPage type="movie" />}
            />
            <Route path="shows" element={<ContentPage type="shows" />} />
            <Route
              path="shows/:query"
              element={<ContentPage type="showsSearch" />}
            />
            <Route path="show/:showId" element={<DetailsPage type="show" />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </GlobalProvider>
    </Router>
  </QueryClientProvider>
);

export default App;
