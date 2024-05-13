import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useGlobalContext } from "contexts/GlobalContext";
import useDebounce from "hooks/useDebounce";
import { useNavigate, useParams } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { query, movieId, showId } = useParams<{
    query?: string;
    movieId?: string;
    showId?: string;
  }>();
  const [queryParam, setQueryParam] = useState(query);
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } =
    useGlobalContext();
  const isSingle = !!movieId || !!showId;
  const toMovies = query ? `/movies/${query}` : "/movies";
  const toShows = query ? `/shows/${query}` : "/shows";
  let debouncedSearchTerm = useDebounce(searchQuery, 1000);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setQueryParam(event.target.value);
  };

  useEffect(() => {
    query && setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length >= 3 && !isSingle) {
      const trimmedSearchTerm = debouncedSearchTerm.trim();
      navigate(
        `/${
          selectedCategory === "movies" ? "movies" : "shows"
        }/${trimmedSearchTerm}`
      );
    } else if (
      debouncedSearchTerm.length < 3 &&
      queryParam !== undefined &&
      queryParam.length < 3 &&
      !isSingle
    ) {
      navigate(`${selectedCategory}`);
    }
  }, [debouncedSearchTerm, navigate, selectedCategory, isSingle, queryParam]);

  return (
    <>
      {selectedCategory !== "movie" && selectedCategory !== "show" && (
        <header className="navbar">
          <nav className="button-group">
            <Button onClick={() => setSelectedCategory("movies")} to={toMovies}>
              Movies
            </Button>
            <Button onClick={() => setSelectedCategory("shows")} to={toShows}>
              TV Shows
            </Button>
          </nav>
          <input
            type="search"
            className="input-search"
            placeholder="Search..."
            aria-label="Search"
            value={searchQuery}
            onChange={handleChange}
          />
        </header>
      )}
    </>
  );
};

export default Navbar;
