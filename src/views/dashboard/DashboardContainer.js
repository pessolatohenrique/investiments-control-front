import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Alert,
  Button,
  Snackbar,
  TextField,
  Box,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  MODAL_CONFIRM_TITLE,
  MODAL_CONFIRM_SUBTITLE,
} from "../../constants/messages";
import { THEME_COLOR } from "../../constants/default_settings";
import ModalWrapper from "../../components/ModalWrapper";
import ViewListToggle from "../../components/ViewListToggle";
import { BarChartComparative } from "../../components/ChartWrapper";
import useView from "../../hooks/useView";
import earningImage from "../../assets/earnings.jpg";
import expensesImage from "../../assets/expenses.jpg";
import indicatorsImage from "../../assets/indicators.png";
import indicatorsComingSoon from "../../assets/indicators.jpg";
import { EarningTable } from "../earnings/EarningTable";
import { EarningList } from "../earnings/EarningList";
import { ExpenseTable } from "../expenses/ExpenseTable";
import { ExpenseList } from "../expenses/ExpenseList";
import { RecipeTable } from "../recipe/RecipeTable";
import { GoalList } from "../goals/GoalList";
import { InvestimentList } from "../investiments/InvestimentList";

import {
  SNACKBAR_DIRECTION,
  DATE_MIN_FILTER,
  DATE_MAX_FILTER,
} from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

function useViewWrapper(initial = "table") {
  const [isTable, isList, switchFormat] = useView(initial);
  return [isTable, isList, switchFormat];
}

function DashboardContainer() {
  // custom hooks
  const { open, error, setError, showToast, hideToast } = useToast();
  const [isTableGoal, isListGoal, switchFormatGoal] = useViewWrapper("list");

  // local states
  const [goals, setGoals] = useState([]);
  const [investiments, setInvestiments] = useState([]);

  async function getGoals() {
    try {
      const response = await axios.get(`/goal`);
      setGoals(response.data);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  async function getInvestiments() {
    try {
      const response = await axios.get(`/investiment`);
      setInvestiments(response?.data?.slice(0, 6));
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  useEffect(() => {
    getGoals();
    getInvestiments();
  }, []);

  return (
    <Box
      minHeight="100vh"
      sx={{
        backgroundColor: `#E5E5E5`,
        overflow: "hidden",
      }}
    >
      <Snackbar
        anchorOrigin={SNACKBAR_DIRECTION}
        open={open}
        autoHideDuration={6000}
        onClose={hideToast}
      >
        <Alert onClose={hideToast} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>

      <Grid
        container
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={5}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h1"
                color={THEME_COLOR}
              >
                Metas
              </Typography>

              <ViewListToggle
                isTable={isTableGoal}
                isList={isListGoal}
                switchFormat={switchFormatGoal}
              />

              {isTableGoal() && <GoalList goals={goals} />}

              {isListGoal() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={goals}
                  labelProperty="name"
                  mainConfig={{
                    legend: "Esperado (%)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "expected_value_percenage",
                  }}
                  secondConfig={{
                    legend: "Atual (%)",
                    backgroundColor: "rgba(82, 178, 191, 0.5)",
                    valueProperty: "actual_value_percentage",
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid
        container
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={5}
        marginBottom={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={12} md={12} sm={12} xs={11}>
          <Card>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="h1"
                color={THEME_COLOR}
              >
                Investimentos
              </Typography>

              <InvestimentList investiments={investiments} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardContainer;
