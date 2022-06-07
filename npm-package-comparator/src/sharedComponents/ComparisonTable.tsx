import React, { FC } from "react";
//styles
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
//src
import "../styles/comparison-table.css";

interface Maintainer {
  username: string;
  email: string;
}

interface Props {
  name: string;
  description: string;
  keywords: string[];
  repository: string;
  license: string;
  lastModDate: string;
  author: string;
  maintainers: Maintainer;
}

const ComparisonTable: FC<Props> = ({
  name,
  description,
  keywords,
  repository,
  license,
  lastModDate,
  author,
  maintainers,
}) => {
  const today = new Date();

  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [modDate] = lastModDate.split("T");
  const [currYear, currMonth] = date.split("-");
  const [modYear, modMonth] = modDate.split("-");
  let year = 0,
    month = 0;
  if (modYear < currYear) {
    year = parseInt(currYear) - parseInt(modYear);
  }
  if (modMonth < currMonth) {
    month = parseInt(currMonth) - parseInt(modMonth);
  }
  return (
    <div className="table-container">
      <TableContainer sx={{ width: 500 }} component={Paper}>
        <Table className="table-main" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header">Package Name</TableCell>
              <TableCell className="header-name" align="center">
                {name}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Description</TableCell>
              <TableCell className="header-name" align="center">
                {description}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Keywords</TableCell>
              <TableCell className="header-name" align="center">
                {keywords ? (
                  keywords.map((keyword) => (
                    <li key={keyword}>{" • " + keyword}</li>
                  ))
                ) : (
                  <span>N/A</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Repository</TableCell>
              <TableCell className="header-name" align="center">
                {repository}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">License</TableCell>
              <TableCell className="header-name" align="center">
                {license}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Last Modification Date</TableCell>
              <TableCell className="header-name" align="center">
                Last Modified:
                {year > 0
                  ? year + " Year/s ago"
                  : month > 0
                  ? month + " month/s ago"
                  : " less than a month ago"}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Authors/Publishers</TableCell>
              <TableCell className="header-name" align="center">
                {author}
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell className="header">Maintainers</TableCell>
              <TableCell className="header-name" align="center">
                {maintainers ? (
                  <li>{maintainers.username}</li>
                ) : (
                  <p>{author}</p>
                )}
              </TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ComparisonTable;
