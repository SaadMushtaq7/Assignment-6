import React, { FC, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ComparisonTable from "../sharedComponents/ComparisonTable";
import ComparisonChart from "../sharedComponents/ComparisonChart";
import Logo from "../logo2.png";
import "../styles/result-page.css";

const ResultPage: FC = () => {
  const [betterPackage, setBetterPackage] = useState<any>();
  const [checker, setChecker] = useState<Boolean>(false);
  const [betterTimes, setBetterTimes] = useState<Number>(0.0);
  const packageOne = useSelector(
    (state: any) => state.bothPackages.firstPackage
  );
  const packageTwo = useSelector(
    (state: any) => state.bothPackages.secondPackage
  );
  const packages = [packageOne, packageTwo];
  if (Object.keys(packageOne).length && Object.keys(packageTwo).length) {
    if (packageOne.score.final >= packageTwo.score.final) {
      setChecker(true);
    }
  }
  useEffect(() => {
    if (Object.keys(packageOne).length && Object.keys(packageTwo).length) {
      if (checker) {
        setBetterPackage(packageOne);

        setBetterTimes(packageOne.score.final - packageTwo.score.final);
      } else {
        setBetterPackage(packageTwo);
        setBetterTimes(packageTwo.score.final - packageOne.score.final);
      }
    }
  }, [checker, packageOne, packageTwo]);

  return (
    <>
      {Object.keys(packageOne).length && Object.keys(packageTwo).length ? (
        <div className="result-container">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className="body">
            <h1>Comparison</h1>
            <div className="table-content">
              {packages.map((pack) => (
                <ComparisonTable
                  key={pack.analyzedAt}
                  name={pack.collected.metadata.name}
                  description={pack.collected.metadata.description}
                  keywords={pack.collected.metadata.keywords}
                  repository={pack.collected.metadata.repository.type}
                  license={pack.collected.metadata.license}
                  lastModDate={pack.analyzedAt}
                  author={pack.collected.metadata.author.name}
                  maintainers={pack.collected.metadata.maintainers}
                />
              ))}
            </div>
            <div className="chart-comparison">
              <h1>Downloads</h1>
              <ComparisonChart
                firstName={packageOne.collected.metadata.name}
                firstData={packageOne.collected.npm.downloads}
                secondName={packageTwo.collected.metadata.name}
                secondData={packageTwo.collected.npm.downloads}
              />
            </div>
            {betterPackage && (
              <>
                <div className="final-results">
                  <h1>
                    {betterPackage.collected.metadata.name} is{" "}
                    {betterTimes.toFixed(2)} times better
                  </h1>
                </div>
                <div className="final-specs">
                  <div className="specs-header">
                    <p>
                      <strong>Recommended:</strong>{" "}
                      {betterPackage.collected.metadata.name}
                    </p>
                    <div className="description">
                      <p>{betterPackage.collected.metadata.description}</p>
                    </div>
                    <div className="link">
                      <p>
                        Visit this link for more information{" "}
                        <a href={betterPackage.collected.github.homepage}>
                          HomePage
                        </a>
                      </p>
                    </div>
                    <div className="languages">
                      <h4>Languages</h4>
                      <li>Typescript</li>
                      <li>Javascript</li>
                    </div>
                  </div>
                  <div className="detail-specs">
                    <div className="downloads">
                      <p>Downloads</p>
                      <h3>
                        {Math.floor(
                          betterPackage.evaluation.popularity.downloadsCount
                        )}
                        +
                      </h3>
                    </div>
                    <div className="stars">
                      <p>Stars</p>
                      <h3>{betterPackage.collected.github.starsCount}+</h3>
                    </div>
                    <div className="health">
                      <p>Health</p>
                      <h3>{betterPackage.evaluation.quality.health * 100}%</h3>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="error-block">
          <h1>
            Error Loading Files{" "}
            <i className="fa-solid fa-triangle-exclamation" />
          </h1>
        </div>
      )}
    </>
  );
};

export default ResultPage;
