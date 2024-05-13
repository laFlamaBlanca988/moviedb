import { Movie, Show, ContentResponse } from "types/contentTypes";
import axiosInstance from "services/axiosInstance";

export const getContentTopRated = async (
  contentType: "movie" | "tv"
): Promise<Movie[] | Show[]> => {
  try {
    const response = await axiosInstance.get<
      ContentResponse<Movie> | ContentResponse<Show>
    >(`/${contentType}/top_rated`);

    return response.data.results;
  } catch (error) {
    // console.error(`Error fetching top rated ${contentType}:`, error);
    throw new Error(`Failed to fetch top rated ${contentType}`);
  }
};

export const getContentSearch = async (
  contentType: "movie" | "tv",
  query: string | undefined
): Promise<Movie[] | Show[]> => {
  try {
    const response = await axiosInstance.get<
      ContentResponse<Movie> | ContentResponse<Show>
    >(`/search/${contentType}?query=${query}`);

    return response.data.results;
  } catch (error) {
    // console.error(`Error fetching search results for ${contentType}:`, error);
    throw new Error(`Failed to fetch search results for ${contentType}`);
  }
};

export const getContentById = async (
  contentType: "movie" | "tv",
  id: string | undefined
): Promise<Movie | Show> => {
  try {
    const response = await axiosInstance.get<Movie | Show>(
      `${contentType}/${id}`
    );
    return response.data;
  } catch (error) {
    // console.error(`Error fetching ${contentType} by ID:`, error);
    throw new Error(`Failed to fetch ${contentType} by ID`);
  }
};
