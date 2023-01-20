import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import { THEME_COLOR } from "../../constants/default_settings";
import ViewListToggle from "../../components/ViewListToggle";
import { BarChartComparative } from "../../components/ChartWrapper";
import useView from "../../hooks/useView";
import { GoalList } from "../goals/GoalList";
import { StatisticTable } from "../statistics/StatisticTable";

import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

function useViewWrapper(initial = "table") {
  const [isTable, isList, switchFormat] = useView(initial);
  return [isTable, isList, switchFormat];
}

function StatisticContainer() {
  // custom hooks
  const { open, error, setError, showToast, hideToast } = useToast();

  const [
    isTableStatisticType,
    isListStatisticType,
    switchStatisticType,
  ] = useViewWrapper("list");
  const [
    isTableStatisticYear,
    isListStatisticYear,
    switchStatisticYear,
  ] = useViewWrapper("list");
  const [
    isTableStatisticPlatform,
    isListStatisticPlatform,
    switchStatisticPlatform,
  ] = useViewWrapper("list");
  const [
    isTableStatisticCategory,
    isListStatisticCategory,
    switchStatisticCategory,
  ] = useViewWrapper("list");

  // local states
  const [statisticsByType, setStatisticsByType] = useState([]);
  const [statisticsByYear, setStatisticsByYear] = useState([]);
  const [statisticsByPlatform, setStatisticsByPlatform] = useState([]);
  const [statisticsByCategory, setStatisticsByCategory] = useState([]);

  async function getStatisticsByType() {
    try {
      const response = await axios.get(`/statistic/group?by=type`);
      setStatisticsByType(response?.data?.result);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  async function getStatisticsByYear() {
    try {
      const response = await axios.get(`/statistic/group?by=final_date`);
      setStatisticsByYear(response?.data?.result);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  async function getStatisticsByPlatform() {
    try {
      const response = await axios.get(`/statistic/group?by=platform`);
      setStatisticsByPlatform(response?.data?.result);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  async function getStatisticsByCategory() {
    try {
      const response = await axios.get(`/statistic/group?by=category`);
      setStatisticsByCategory(response?.data?.result);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  useEffect(() => {
    getStatisticsByType();
    getStatisticsByYear();
    getStatisticsByPlatform();
    getStatisticsByCategory();
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
                Por tipo de investimento
              </Typography>

              <ViewListToggle
                isTable={isTableStatisticType}
                isList={isListStatisticType}
                switchFormat={switchStatisticType}
              />

              {isTableStatisticType() && (
                <StatisticTable result={statisticsByType} />
              )}

              {isListStatisticType() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={statisticsByType}
                  labelProperty="dream_name"
                  mainConfig={{
                    legend: "Esperado (R$)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "sum_expected_net_value",
                  }}
                  secondConfig={{
                    legend: "Investido (R$)",
                    backgroundColor: "rgba(82, 178, 191, 0.5)",
                    valueProperty: "sum_invested_amount",
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
                Por ano de resgate
              </Typography>

              <ViewListToggle
                isTable={isTableStatisticYear}
                isList={isListStatisticYear}
                switchFormat={switchStatisticYear}
              />

              {isTableStatisticYear() && (
                <StatisticTable result={statisticsByYear} />
              )}

              {isListStatisticYear() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={statisticsByYear}
                  labelProperty="dream_name"
                  mainConfig={{
                    legend: "Esperado (R$)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "sum_expected_net_value",
                  }}
                  secondConfig={{
                    legend: "Investido (R$)",
                    backgroundColor: "rgba(82, 178, 191, 0.5)",
                    valueProperty: "sum_invested_amount",
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
                Por plataforma
              </Typography>

              <ViewListToggle
                isTable={isTableStatisticPlatform}
                isList={isListStatisticPlatform}
                switchFormat={switchStatisticPlatform}
              />

              {isTableStatisticPlatform() && (
                <StatisticTable result={statisticsByPlatform} />
              )}

              {isListStatisticYear() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={statisticsByPlatform}
                  labelProperty="dream_name"
                  mainConfig={{
                    legend: "Esperado (R$)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "sum_expected_net_value",
                  }}
                  secondConfig={{
                    legend: "Investido (R$)",
                    backgroundColor: "rgba(82, 178, 191, 0.5)",
                    valueProperty: "sum_invested_amount",
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
                Por categoria
              </Typography>

              <ViewListToggle
                isTable={isTableStatisticCategory}
                isList={isListStatisticCategory}
                switchFormat={switchStatisticCategory}
              />

              {isTableStatisticCategory() && (
                <StatisticTable result={statisticsByCategory} />
              )}

              {isListStatisticYear() && !process.env.JEST_WORKER_ID && (
                <BarChartComparative
                  data={statisticsByCategory}
                  labelProperty="dream_name"
                  mainConfig={{
                    legend: "Esperado (R$)",
                    backgroundColor: "rgba(53, 162, 235, 0.5)",
                    valueProperty: "sum_expected_net_value",
                  }}
                  secondConfig={{
                    legend: "Investido (R$)",
                    backgroundColor: "rgba(82, 178, 191, 0.5)",
                    valueProperty: "sum_invested_amount",
                  }}
                />
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatisticContainer;
