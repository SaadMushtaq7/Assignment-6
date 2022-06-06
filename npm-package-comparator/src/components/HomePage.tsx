import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import {
  fetchPackages,
  fetchSuggestionPackages,
} from "../services/npmPackages";
import Logo from "../logo2.png";
import "react-toastify/dist/ReactToastify.css";
import "../styles/home-page.css";

const HomePage: FC = () => {
  const Theme = createTheme({
    palette: {
      primary: {
        main: "#2ABF83",
      },
    },
  });

  const [firstPackage, setFirstPackage] = useState<string>("");
  const [secondPackage, setSecondPackage] = useState<string>("");
  const [suggestPackage, setSuggestPackage] = useState<string>("");
  const [fetchingOne, setFetchingOne] = useState<boolean>(false);
  const [fetchingTwo, setFetchingTwo] = useState<boolean>(false);
  const [suggestionFetched, setSuggestionFetched] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<Boolean>(false);

  const { data: suggestionResults, refetch: suggestionRefetch } = useQuery(
    "suggestionPackages",
    async ({ signal }) => fetchSuggestionPackages(suggestPackage, signal),
    {
      enabled: false,
      cacheTime: 0,
    }
  );

  const {
    data: firstResults,
    refetch: firstRefetch,
    isLoading: firstLoading,
    isSuccess: firstSuccess,
  } = useQuery("firstPackage", () => fetchPackages(firstPackage), {
    enabled: false,
    cacheTime: 0,
  });

  const {
    data: secondResults,
    refetch: secondRefetch,
    isLoading: secondLoading,
    isSuccess: secondSuccess,
  } = useQuery("secondPackage", () => fetchPackages(secondPackage), {
    enabled: false,
    cacheTime: 0,
  });

  const navigate = useNavigate();

  const handleComparison = () => {
    if (firstPackage && secondPackage) {
      firstRefetch();
      secondRefetch();
      setIsClicked(true);
    } else {
      toast.error("Fill both input fields!");
    }
  };

  const handleFirstPackage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstPackage(e.target.value);
    setSuggestPackage(e.target.value);
    setFetchingOne(true);
    suggestionRefetch();
  };

  const handleSecondPackage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPackage(e.target.value);
    setSuggestPackage(e.target.value);
    setFetchingTwo(true);
    suggestionRefetch();
  };
  useEffect(() => {
    if (suggestionResults) {
      setSuggestionFetched(true);
    }
    if (
      firstSuccess &&
      secondSuccess &&
      isClicked &&
      firstResults &&
      secondResults
    ) {
      navigate("/result", {
        state: { packageOne: firstResults, packageTwo: secondResults },
      });
      setIsClicked(false);
    }
  }, [
    firstResults,
    secondResults,
    isClicked,
    navigate,
    firstSuccess,
    secondSuccess,
    suggestionResults,
  ]);

  return (
    <>
      {firstLoading || secondLoading ? (
        <div className="loader">
          <Triangle height="100" width="100" color="#2abf83" />
        </div>
      ) : (
        <>
          <ThemeProvider theme={Theme}>
            <div className="homepage-container">
              <div className="image-container">
                <Link to="/">
                  <img src={Logo} alt="Logo" />
                </Link>
              </div>
              <div className="input-container">
                <div>
                  <TextField
                    className="input"
                    id="outlined-first"
                    label="First Package"
                    value={firstPackage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleFirstPackage(e)
                    }
                    variant="outlined"
                  />
                  {suggestionFetched && fetchingOne ? (
                    <div className="suggestion-container">
                      {suggestionResults.map((suggest: any, index: number) => (
                        <p
                          className="dataItem"
                          onClick={() => {
                            setFirstPackage(suggest.package.name);
                            setSuggestionFetched(false);
                            setFetchingOne(false);
                          }}
                          key={index}
                        >
                          {suggest.package.name}
                        </p>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  <TextField
                    className="input input-field"
                    id="outlined-second"
                    label="Second Package"
                    value={secondPackage}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleSecondPackage(e)
                    }
                    variant="outlined"
                  />
                  {suggestionFetched && fetchingTwo ? (
                    <div className="suggestion-container">
                      {suggestionResults.map((suggest: any, index: number) => (
                        <p
                          className="dataItem"
                          onClick={() => {
                            setSecondPackage(suggest.package.name);
                            setSuggestionFetched(false);
                            setFetchingTwo(false);
                          }}
                          key={index}
                        >
                          {suggest.package.name}
                        </p>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              <div className="button-container">
                <Button
                  className="comparison-btn"
                  variant="contained"
                  onClick={handleComparison}
                >
                  Compare
                </Button>
              </div>
            </div>
          </ThemeProvider>
          <ToastContainer
            position="top-center"
            autoClose={2500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
};

export default HomePage;
