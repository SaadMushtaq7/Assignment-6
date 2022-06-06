import React, { FC, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ComparisonTable from "../sharedComponents/ComparisonTable";
import ComparisonChart from "../sharedComponents/ComparisonChart";
import Logo from "../logo2.png";
import "../styles/result-page.css";

interface Downloads {
  from: string;
  to: string;
  count: number;
}

const ResultPage: FC = () => {
  const [betterPackage, setBetterPackage] = useState<any>();
  const [betterTimes, setBetterTimes] = useState<Number>(0.0);
  const location: any = useLocation();
  const packageOne = location.state.packageOne;
  const packageTwo = location.state.packageTwo;
  const packages = [packageOne, packageTwo];

  const findTotal = (downloads: Downloads[]) => {
    return downloads
      .map((download) => download.count)
      .reduce(
        (prevNumber: number, currNumber: number) => prevNumber + currNumber
      );
  };
  useEffect(() => {
    const totalOne = findTotal(packageOne.collected.npm.downloads);
    const totalTwo = findTotal(packageTwo.collected.npm.downloads);
    const meanOne = totalOne / packageOne.collected.npm.downloads.length;
    const meanTwo = totalTwo / packageTwo.collected.npm.downloads.length;
    let downloadOne = 0;
    let downloadTwo = 0;
    if (meanOne >= meanTwo) {
      downloadOne = ((meanOne - meanTwo) / meanOne) * 100;
      downloadTwo = 100 - downloadOne;
    } else {
      downloadTwo = ((meanTwo - meanOne) / meanTwo) * 100;
      downloadOne = 100 - downloadTwo;
    }

    const downloadPercentageOne = downloadOne * 0.5;
    const downloadPercentageTwo = downloadTwo * 0.5;
    let communityInterestOne = 0;
    let communityInterestTwo = 0;
    if (
      packageOne.evaluation.popularity.communityInterest >=
      packageTwo.evaluation.popularity.communityInterest
    ) {
      communityInterestOne =
        ((packageOne.evaluation.popularity.communityInterest -
          packageTwo.evaluation.popularity.communityInterest) /
          packageOne.evaluation.popularity.communityInterest) *
        100;
      communityInterestTwo = 100 - communityInterestOne;
    } else {
      communityInterestTwo =
        ((packageTwo.evaluation.popularity.communityInterest -
          packageOne.evaluation.popularity.communityInterest) /
          packageTwo.evaluation.popularity.communityInterest) *
        100;
      communityInterestOne = 100 - communityInterestTwo;
    }

    const communityInterestPercentageOne = communityInterestOne * 0.2;
    const communityInterestPercentageTwo = communityInterestTwo * 0.2;

    const carefulnessOne = packageOne.evaluation.quality.carefulness * 0.15;
    const carefulnessTwo = packageTwo.evaluation.quality.carefulness * 0.15;

    const healthOne = packageOne.evaluation.quality.health * 0.15;
    const healthTwo = packageTwo.evaluation.quality.health * 0.15;

    const finalOne =
      downloadPercentageOne +
      communityInterestPercentageOne +
      carefulnessOne +
      healthOne;

    const finalTwo =
      downloadPercentageTwo +
      communityInterestPercentageTwo +
      carefulnessTwo +
      healthTwo;
    if (finalOne >= finalTwo) {
      setBetterPackage(packageOne);
      setBetterTimes(finalOne / finalTwo);
    } else {
      setBetterPackage(packageTwo);
      setBetterTimes(finalTwo / finalOne);
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
  );
};

export default ResultPage;
