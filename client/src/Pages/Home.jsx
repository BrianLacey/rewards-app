import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Typography,
  Grid,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  Box,
  CircularProgress,
} from "@mui/material";
import { months, years, mockData } from "../constants";
import { getAllRewards, getThreeMonthRewards } from "../services/rewardsPoints";
import { DataContext } from "../Components/contexts";

const Home = () => {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState(false);
  const [goProgress, setGoProgress] = useState(false);
  const [allProgress, setAllProgress] = useState(false);
  const [error, setError] = useState(false);
  const { resultData, setResultData } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (parseInt(month) > 10 && parseInt(year) > 2024) {
      if (!error) {
        setError(true);
      }
    } else {
      if (error) {
        setError(false);
      }
    }
  }, [month, year]);

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
    }
  };

  const convertToArray = (obj) => {
    const keys = Object.keys(obj);
    return keys.map((key) => {
      const value = obj[key];
      return { ...value, name: key };
    });
  };

  const handleSubmit = async (e) => {
    const { name } = e.target;
    setLoading(true);
    if (name === "periodButton") {
      setGoProgress(true);
      const rewards = await getThreeMonthRewards(mockData, month, year);
      setResultData(convertToArray(rewards));
      navigate("/result");
    } else if (name === "allButton") {
      setAllProgress(true);
      const rewards = await getAllRewards(mockData);
      setResultData(convertToArray(rewards));
      navigate("/result");
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
                <FormControl fullWidth error={error}>
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
                  {error && (
                    <FormHelperText>Not a 3 month period</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid className="grow">
                <FormControl fullWidth error={error}>
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
                  disabled={loading || !month || !year || error}
                  onClick={handleSubmit}
                >
                  Go
                </Button>
                {goProgress && (
                  <CircularProgress
                    size={30}
                    sx={{
                      color: "white",
                      position: "absolute",
                      top: "12%",
                      left: "30%",
                    }}
                  />
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
              <CircularProgress
                size={30}
                sx={{
                  color: "white",
                  position: "absolute",
                  top: "10%",
                  left: "42%",
                }}
              />
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
