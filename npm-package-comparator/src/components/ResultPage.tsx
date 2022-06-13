import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
//src
import ComparisonTable from "../sharedComponents/ComparisonTable";
import ComparisonChart from "../sharedComponents/ComparisonChart";
import Logo from "../logo2.png";
import "../styles/result-page.css";

const ResultPage: FC = () => {
  const [recommendedPackage, setRecommendedPackage] = useState<any>();
  const [packageRates, setPackageRates] = useState<Number>(0.0);
  const location: any = useLocation();
  const packageOne = location.state.packageOne;
  const packageTwo = location.state.packageTwo;
  const packages = [packageOne, packageTwo];
  console.log(packageOne, packageTwo);
  useEffect(() => {
    let downloadOne = 0;
    let downloadTwo = 0;
    if (
      packageOne.evaluation.popularity.downloadsCount >=
      packageTwo.evaluation.popularity.downloadsCount
    ) {
      downloadOne =
        (packageTwo.evaluation.popularity.downloadsCount /
          packageOne.evaluation.popularity.downloadsCount) *
        50;
      downloadTwo = 50 - downloadOne;
    } else {
      downloadTwo =
        (packageOne.evaluation.popularity.downloadsCount /
          packageTwo.evaluation.popularity.downloadsCount) *
        50;
      downloadOne = 50 - downloadTwo;
    }
    let communityInterestOne = 0;
    let communityInterestTwo = 0;
    if (
      packageOne.evaluation.popularity.communityInterest >=
      packageTwo.evaluation.popularity.communityInterest
    ) {
      communityInterestOne =
        (packageTwo.evaluation.popularity.communityInterest /
          packageOne.evaluation.popularity.communityInterest) *
        20;
      communityInterestTwo = 20 - communityInterestOne;
    } else {
      communityInterestTwo =
        (packageOne.evaluation.popularity.communityInterest /
          packageTwo.evaluation.popularity.communityInterest) *
        20;
      communityInterestOne = 20 - communityInterestTwo;
    }
    let carefulnessOne = 0;
    let carefulnessTwo = 0;
    if (
      packageOne.evaluation.quality.carefulness >=
      packageTwo.evaluation.quality.carefulness
    ) {
      carefulnessOne =
        (packageTwo.evaluation.quality.carefulness /
          packageOne.evaluation.quality.carefulness) *
        15;
      carefulnessTwo = 15 - carefulnessOne;
    } else {
      carefulnessTwo =
        (packageOne.evaluation.quality.carefulness /
          packageTwo.evaluation.quality.carefulness) *
        15;
      carefulnessOne = 15 - carefulnessTwo;
    }
    let healthOne = 0;
    let healthTwo = 0;
    if (
      packageOne.evaluation.quality.health >=
      packageTwo.evaluation.quality.health
    ) {
      healthOne =
        (packageTwo.evaluation.quality.health /
          packageOne.evaluation.quality.health) *
        15;
      healthTwo = 15 - healthOne;
    } else {
      healthTwo =
        (packageOne.evaluation.quality.health /
          packageTwo.evaluation.quality.health) *
        15;
      healthOne = 15 - healthTwo;
    }
    const finalOne =
      downloadOne + communityInterestOne + carefulnessOne + healthOne;

    const finalTwo =
      downloadTwo + communityInterestTwo + carefulnessTwo + healthTwo;
    if (finalOne >= finalTwo) {
      setRecommendedPackage(packageOne);
      setPackageRates(finalOne / finalTwo);
    } else {
      setRecommendedPackage(packageTwo);
      setPackageRates(finalTwo / finalOne);
    }
  }, [packageOne, packageTwo]);
  return (
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
              author={
                pack.collected.metadata.author
                  ? pack.collected.metadata.author.name
                  : pack.collected.metadata.maintainers[0].username
              }
              maintainers={pack.collected.metadata.maintainers[0]}
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
        {recommendedPackage && (
          <>
            <div className="final-results">
              <h1>
                {recommendedPackage.collected.metadata.name} is{" "}
                {packageRates.toFixed(2)} times better
              </h1>
            </div>
            <div className="final-specs">
              <div className="specs-header">
                <p>
                  <strong>Recommended:</strong>{" "}
                  {recommendedPackage.collected.metadata.name}
                </p>
                <div className="description">
                  <p>{recommendedPackage.collected.metadata.description}</p>
                </div>
                <div className="link">
                  <p>
                    Visit this link for more information{" "}
                    <a href={recommendedPackage.collected.github.homepage}>
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
                      recommendedPackage.evaluation.popularity.downloadsCount
                    )}
                    +
                  </h3>
                </div>
                <div className="stars">
                  <p>Stars</p>
                  <h3>{recommendedPackage.collected.github.starsCount}+</h3>
                </div>
                <div className="health">
                  <p>Health</p>
                  <h3>{recommendedPackage.evaluation.quality.health * 100}%</h3>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
