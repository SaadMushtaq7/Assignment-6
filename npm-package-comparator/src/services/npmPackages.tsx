import axios from "axios";

export const fetchPackages = async (npmPackage: string) => {
  return await axios
    .get(`https://api.npms.io/v2/package/${npmPackage}`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const fetchSuggestionPackages = async (
  npmPackage: string,
  signal: any
) => {
  console.log(npmPackage);
  return await axios
    .get(`https://api.npms.io/v2/search/suggestions?q=${npmPackage}`, {
      signal,
    })
    //.get(`https://api.npms.io/v2/search/suggestions?q=rea`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
