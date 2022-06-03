import { FC, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { Triangle } from "react-loader-spinner";
import { fetchPackages } from "../services/npmPackages";
import { setPackageOne, setPackageTwo } from "../redux/actions/filesActions";
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

  const dispatch = useDispatch();
  const [firstPackage, setFirstPackage] = useState<string>("");
  const [secondPackage, setSecondPackage] = useState<string>("");
  const [isClicked, setIsClicked] = useState<Boolean>(false);

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

  useEffect(() => {
    if (firstSuccess && secondSuccess && isClicked) {
      dispatch(setPackageOne(firstResults));
      dispatch(setPackageTwo(secondResults));
      navigate("/result");
      setIsClicked(false);
    }
  }, [
    firstResults,
    secondResults,
    isClicked,
    navigate,
    dispatch,
    firstSuccess,
    secondSuccess,
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
                <TextField
                  className="input"
                  id="outlined-first"
                  label="First Package"
                  value={firstPackage}
                  onChange={(e) => {
                    setFirstPackage(e.target.value);
                  }}
                  variant="outlined"
                />
                <TextField
                  className="input input-field"
                  id="outlined-second"
                  label="Second Package"
                  value={secondPackage}
                  onChange={(e) => {
                    setSecondPackage(e.target.value);
                  }}
                  variant="outlined"
                />
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
