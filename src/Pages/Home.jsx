import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Box,
  CircularProgress,
} from "@mui/material";
import { months, years } from "../constants";

const Home = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [goProgress, setGoProgress] = useState(false);
  const [allProgress, setAllProgress] = useState(false);

  const renderMonths = () => {
    return months.map((item) => {
      const { name, value } = item;
      return (
        <MenuItem key={name} value={value}>
          {name}
        </MenuItem>
      );
    });
  };

  const renderYears = () => {
    return years.map((item) => {
      return (
        <MenuItem key={item} value={item}>
          {item}
        </MenuItem>
      );
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "month") {
      setMonth(value);
    } else if (name === "year") {
      setYear(value);
    } else return;
  };

  const handleSubmit = (e) => {
    const { name } = e.target;
    setLoading(true);
    if (name === "periodButton") {
      setGoProgress(true);
    } else if (name === "allButton") {
      setAllProgress(true);
    }
  };

  return (
    <Container className="text-white">
      <Grid
        container
        direction="column"
        className="pt-60 justify-center items-center"
      >
        <Grid>
          <Typography variant="h2">
            Welcome to the Rewards Home Page!
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={3}
          className="pt-20 items-center"
        >
          <Grid container direction="column">
            <Grid>
              <Typography variant="h5">Search by 3-month period</Typography>
            </Grid>
            <Grid container className="w-full">
              <Grid className="grow">
                <FormControl fullWidth>
                  <InputLabel id="monthSelect">Month</InputLabel>
                  <Select
                    labelId="monthSelect"
                    label="Month"
                    name="month"
                    value={month}
                    onChange={handleChange}
                  >
                    {renderMonths()}
                  </Select>
                </FormControl>
              </Grid>
              <Grid className="grow">
                <FormControl fullWidth>
                  <InputLabel id="yearSelect">Year</InputLabel>
                  <Select
                    labelId="yearSelect"
                    label="Year"
                    name="year"
                    value={year}
                    onChange={handleChange}
                  >
                    {renderYears()}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container className="w-full grow justify-center">
              <Box className="relative">
                <Button
                  name="periodButton"
                  variant="contained"
                  size="large"
                  color="info"
                  disabled={loading || !month || !year}
                  onClick={handleSubmit}
                >
                  Go
                </Button>
                {goProgress && (
                  <CircularProgress size={30} sx={{ color: "white", position: "absolute", top: "12%", left: "30%" }} />
                )}
              </Box>
            </Grid>
          </Grid>
          <Typography variant="h3">OR</Typography>
          <Box className="relative">
            <Button
              name="allButton"
              variant="contained"
              size="large"
              color="info"
              disabled={loading}
              onClick={handleSubmit}
            >
              Show me all records
            </Button>
            {allProgress && (
              <CircularProgress size={30} sx={{ color: "white", position: "absolute", top: "10%", left: "42%" }} />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
