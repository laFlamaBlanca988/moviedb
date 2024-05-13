import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie, Show } from "types/contentTypes";
import placeholderImage from "assets/placeholder-image.jpg";
import { useGlobalContext } from "contexts/GlobalContext";

interface ContentBoxProps {
  data: Movie | Show;
}

const ContentBox: React.FC<ContentBoxProps> = ({ data }) => {
  const { selectedCategory, setSelectedCategory } = useGlobalContext();
  const navigate = useNavigate();
  const isMovie = (data: Movie | Show): data is Movie => {
    return "title" in data;
  };

  const handleClick = () => {
    setSelectedCategory(selectedCategory === "movies" ? "movie" : "show");
  };

  return (
    <div
      onClick={() =>
        navigate(
          `/${selectedCategory === "movies" ? "movie" : "show"}/${data.id}`
        )
      }
    >
      <div className="content-box" onClick={handleClick}>
        <div className="item-image-wrapper">
          <img
            className="item-image"
            src={
              data.backdrop_path
                ? `https://image.tmdb.org/t/p/w500/${data.backdrop_path}`
                : placeholderImage
            }
            alt={isMovie(data) ? data.title : data.name}
            loading="lazy"
          />
        </div>
        <div className="content-title-wrapper">
          <h3 className="content-title">
            {isMovie(data) ? data.title : data.name}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default ContentBox;
