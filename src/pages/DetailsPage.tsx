import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "components/ButtonBack";
import { useContentById } from "services/queries";
import { Movie, Show } from "types/contentTypes";
import placeholderImage from "assets/placeholder-image.jpg";
import { useGlobalContext } from "contexts/GlobalContext";
import Loader from "components/Loader";

interface DetailsPageProps {
  type: "movie" | "show";
}

const DetailsPage: React.FC<DetailsPageProps> = ({ type }) => {
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useGlobalContext();
  const { movieId, showId } = useParams<{
    movieId?: string;
    showId?: string;
  }>();

  const [imageLoaded, setImageLoaded] = useState(false);

  const getContentData = () => {
    switch (type) {
      case "movie":
        return useContentById("movie", movieId);
      case "show":
        return useContentById("tv", showId);
      default:
        return { data: [], isPending: false, isError: true };
    }
  };

  const contentData = getContentData();

  if (contentData.isPending) {
    return <Loader />;
  }

  if (contentData.isError) {
    return <span>There was an error loading content.</span>;
  }

  const goBack = () => {
    setSelectedCategory(selectedCategory === "movie" ? "movies" : "shows");
    navigate(-1);
  };

  const item = contentData.data as Movie | Show;

  return (
    <section className="details-overview">
      <ButtonBack onGoBack={goBack} />
      <div className="details-image-wrapper">
        <img
          className={`details-image ${imageLoaded ? "loaded" : ""}`}
          src={
            item.backdrop_path
              ? `https://image.tmdb.org/t/p/w780/${item.backdrop_path}`
              : placeholderImage
          }
          alt="Backdrop"
          style={{ display: imageLoaded ? "block" : "none" }}
          onLoad={() => setImageLoaded(true)}
        />
      </div>
      <div>
        <h2>
          {type === "movie" ? (item as Movie).title : (item as Show).name}
        </h2>
        <p>{item.overview}</p>
      </div>
    </section>
  );
};

export default DetailsPage;
