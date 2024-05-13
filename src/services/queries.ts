import { useQuery } from "@tanstack/react-query";
import {
  getContentById,
  getContentSearch,
  getContentTopRated,
} from "services/api";
// import { Movie, Movies, Show, Shows } from "types/contentTypes";

export function useContentTopRated(contentType: "movie" | "tv") {
  return useQuery({
    queryKey: ["contentTopRated", contentType],
    queryFn: () => getContentTopRated(contentType),
  });
}

export function useContentById(
  contentType: "movie" | "tv",
  id: string | undefined
) {
  return useQuery({
    queryKey: ["contentById", contentType, id],
    queryFn: () => getContentById(contentType, id),
  });
}

export function useContentSearch(
  contentType: "movie" | "tv",
  query: string | undefined
) {
  return useQuery({
    queryKey: ["contentSearch", contentType, query],
    queryFn: () => getContentSearch(contentType, query),
  });
}
