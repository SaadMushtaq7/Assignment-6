import { useQuery } from "react-query";
import { fetchSuggestionPackages } from "../services/npmPackages";

export const useFetchSuggestPackage = (queryPackage: any) => {
  return useQuery(
    "suggestionPackages",
    async ({ signal }) => fetchSuggestionPackages(queryPackage, signal),
    {
      enabled: false,
      cacheTime: 0,
    }
  );
};
