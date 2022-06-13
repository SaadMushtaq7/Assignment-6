import { useQuery } from "react-query";
import { fetchPackages } from "../services/npmPackages";
export const useFetchSinglePackage = (key: string, npmPackage: any) => {
  return useQuery(key, () => fetchPackages(npmPackage), {
    enabled: false,
    cacheTime: 0,
  });
};
