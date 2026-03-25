import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { DataContext } from "../Components/contexts";

const Result = () => {
  const [datePeriod, setDatePeriod] = useState(true);
  const { resultData, setResultData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const isDatePeriod = resultData.every((item) => {
      const { monthly } = item;
      return Object.keys(monthly).length === 3;
    });
    setDatePeriod(isDatePeriod);
  }, [resultData]);

  const handleNav = () => {
    setResultData([]);
    navigate("/");
  };

  const renderTableHeaders = () => {
    if (datePeriod) {
      const headers = Object.keys(resultData[0].monthly);
      headers.sort((a, b) => new Date(a) - new Date(b));
      headers.unshift("Name");
      headers.push("Total");
      return (
        <TableRow>
          {headers.map((header) => {
            return <TableCell key={header}>{header}</TableCell>;
          })}
        </TableRow>
      );
    } else {
      return (
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Total</TableCell>
        </TableRow>
      );
    }
  };
  const renderTableData = () => {
    if (datePeriod) {
      return resultData.map((item, index) => {
        const { name, monthly, total } = item;
        const dates = Object.keys(monthly);
        dates.sort((a, b) => new Date(a) - new Date(b));
        return (
          <TableRow key={index}>
            <TableCell key={name}>{name}</TableCell>
            {dates.map((date) => (
              <TableCell key={date}>{monthly[date]}</TableCell>
            ))}
            <TableCell key={total}>{total}</TableCell>
          </TableRow>
        );
      });
    } else {
      return resultData.map((item, index) => {
        const { name, total } = item;
        return (
          <TableRow key={index}>
            <TableCell key={name}>{name}</TableCell>
            <TableCell key={total}>{total}</TableCell>
          </TableRow>
        );
      });
    }
  };
  return (
    <Container className="text-white">
      <Grid container direction="column" className="pt-20 items-center">
        <Grid>
          <Typography variant="h2">I am the Result page!</Typography>
        </Grid>
        <Grid className="py-10">
          <Button
            name="periodButton"
            variant="contained"
            size="large"
            color="info"
            onClick={handleNav}
          >
            Back
          </Button>
        </Grid>
        <Grid>
          <TableContainer>
            <Table>
              <TableHead>{renderTableHeaders()}</TableHead>
              <TableBody>{renderTableData()}</TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Result;
