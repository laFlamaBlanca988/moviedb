import React from "react";
import { useParams } from "react-router-dom";
import { useContentTopRated, useContentSearch } from "services/queries";
import ContentBox from "components/ContentBox";
import { Movie, Show } from "types/contentTypes";
import Loader from "components/Loader";

interface ContentPageProps {
  type: "movies" | "shows" | "show" | "movie" | "moviesSearch" | "showsSearch";
}

const ContentPage: React.FC<ContentPageProps> = ({ type }) => {
  const { query } = useParams<{
    query?: string;
    movieId?: string;
    showId?: string;
  }>();

  const getContentData = () => {
    switch (type) {
      case "movies":
        return useContentTopRated("movie");
      case "shows":
        return useContentTopRated("tv");
      case "moviesSearch":
        return useContentSearch("movie", query);
      case "showsSearch":
        return useContentSearch("tv", query);
      default:
        return { data: [], isPending: false, isError: true };
    }
  };

  const contentData = getContentData();

  if (contentData.isPending) {
    return (
      <div className="content-wrapper">
        <Loader />
      </div>
    );
  }

  if (contentData.isError) {
    return <span>There was an error loading content.</span>;
  }

  return (
    <>
      <div className="content-wrapper">
        {contentData.data && contentData.data.length > 0 ? (
          contentData.data
            .slice(0, 10)
            .map((item: Movie | Show) => (
              <ContentBox key={item?.id} data={item} />
            ))
        ) : (
          <h3 className="error">Sorry, no results found.</h3>
        )}
      </div>
    </>
  );
};

export default ContentPage;
