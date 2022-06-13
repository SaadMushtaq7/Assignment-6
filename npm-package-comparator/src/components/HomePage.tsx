import { FC, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import Logo from "../logo2.png";
import "react-toastify/dist/ReactToastify.css";
import "../styles/home-page.css";
import { useFetchSinglePackage } from "../custom hook/useFetchSinglePackage";
import { useFetchSuggestPackage } from "../custom hook/useFetchSuggestPackage";

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
  const [queryPackage, setQueryPackage] = useState<string>("");
  const [showSuggestionListOne, setShowSuggestionListOne] =
    useState<boolean>(false);
  const [showSuggestionListTwo, setShowSuggestionListTwo] =
    useState<boolean>(false);
  const [suggestionFetchedSeparately, setSuggestionFetchedSeparately] =
    useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<Boolean>(false);

  const { data: suggestionResults, refetch: suggestionRefetch } =
    useFetchSuggestPackage(queryPackage);

  const {
    data: firstResults,
    refetch: firstRefetch,
    isLoading: firstLoading,
    isSuccess: firstSuccess,
    isError: firstError,
  } = useFetchSinglePackage("firstPackage", firstPackage);

  const {
    data: secondResults,
    refetch: secondRefetch,
    isLoading: secondLoading,
    isSuccess: secondSuccess,
    isError: secondError,
  } = useFetchSinglePackage("secondPackage", secondPackage);

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
    setQueryPackage(e.target.value);
    setShowSuggestionListOne(true);
    suggestionRefetch();
  };

  const handleSecondPackage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecondPackage(e.target.value);
    setQueryPackage(e.target.value);
    setShowSuggestionListTwo(true);
    suggestionRefetch();
  };
  useEffect(() => {
    if (suggestionResults) {
      setSuggestionFetchedSeparately(true);
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
      ) : firstError && secondError ? (
        <div className="error-container">
          <h1>
            Error Loading File{" "}
            <i className="fa-solid fa-triangle-exclamation" />
          </h1>
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
                  {suggestionFetchedSeparately && showSuggestionListOne ? (
                    <div className="suggestion-container">
                      {suggestionResults.map((suggest: any, index: number) => (
                        <p
                          className="dataItem"
                          onClick={() => {
                            setFirstPackage(suggest.package.name);
                            setSuggestionFetchedSeparately(false);
                            setShowSuggestionListOne(false);
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
                  {suggestionFetchedSeparately && showSuggestionListTwo ? (
                    <div className="suggestion-container">
                      {suggestionResults.map((suggest: any, index: number) => (
                        <p
                          className="dataItem"
                          onClick={() => {
                            setSecondPackage(suggest.package.name);
                            setSuggestionFetchedSeparately(false);
                            setShowSuggestionListTwo(false);
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
