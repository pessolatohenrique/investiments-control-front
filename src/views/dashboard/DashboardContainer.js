import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Alert,
  Snackbar,
  Box,
} from "@mui/material";
import { THEME_COLOR } from "../../constants/default_settings";
import {
  MODAL_CONFIRM_TITLE,
  MODAL_CONFIRM_SUBTITLE,
} from "../../constants/messages";
import ModalWrapper from "../../components/ModalWrapper";
import ViewListToggle from "../../components/ViewListToggle";
import { BarChartComparative } from "../../components/ChartWrapper";
import useView from "../../hooks/useView";
import { GoalList } from "../goals/GoalList";
import { StatisticTable } from "../statistics/StatisticTable";
import { InvestimentList } from "../investiments/InvestimentList";

import { SNACKBAR_DIRECTION } from "../../constants/default_settings";
import useToast from "../../hooks/useToast";

import earningImage from "../../assets/earnings.jpg";
import expensesImage from "../../assets/expenses.jpg";
import indicatorsImage from "../../assets/indicators.png";
import indicatorsComingSoon from "../../assets/indicators.jpg";

function useViewWrapper(initial = "table") {
  const [isTable, isList, switchFormat] = useView(initial);
  return [isTable, isList, switchFormat];
}

function IndicatorCard({ image, title, subtitle }) {
  return (
    <Card data-testid="indicator-card">
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={subtitle}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
}

function DashboardContainer() {
  // custom hooks
  const { open, error, setError, showToast, hideToast } = useToast();
  const [isTableGoal, isListGoal, switchFormatGoal] = useViewWrapper("list");
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

  // local states
  const [summarize, setSummarize] = useState({
    average_month_profitability: 0,
    invested_amount: 0,
    count_investiments: 0,
  });
  const [goals, setGoals] = useState([]);
  const [statisticsByType, setStatisticsByType] = useState([]);
  const [statisticsByYear, setStatisticsByYear] = useState([]);
  const [investiments, setInvestiments] = useState([]);
  const [investimentsRedeemed, setInvestimentsRedeemed] = useState([]);

  // modal
  const [showModalInvestiment, setShowModalInvestiment] = useState(false);
  const [selectedIdInvestiment, setSelectedIdInvestiment] = useState("");

  async function getSummarize() {
    try {
      const response = await axios.get(`/statistic/summary`);
      setSummarize(response?.data);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  async function getGoals() {
    try {
      const response = await axios.get(`/goal`);
      setGoals(response.data);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

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

  async function getInvestiments() {
    try {
      const response = await axios.get(`/investiment`);
      const investimentsResponse = response?.data.filter(
        (item) => !item.has_redeemed
      );
      const investimentsRedeemedResponse = [...response?.data].filter(
        (item) => item.has_redeemed
      );
      setInvestiments(investimentsResponse?.slice(0, 6));
      setInvestimentsRedeemed(investimentsRedeemedResponse?.slice(0, 6));
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  useEffect(() => {
    getSummarize();
    getGoals();
    getStatisticsByType();
    getStatisticsByYear();
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

      {showModalInvestiment && (
        <ModalWrapper
          isOpen={showModalInvestiment}
          title={MODAL_CONFIRM_TITLE}
          subtitle={MODAL_CONFIRM_SUBTITLE}
          hasConfirmButton
          handleClose={() => {
            setSelectedIdInvestiment("");
            setShowModalInvestiment(false);
          }}
          endpoint={{
            method: "delete",
            name: `/investiment/${selectedIdInvestiment}`,
          }}
          callbackMethod={() => getInvestiments()}
        />
      )}

      <Grid
        container
        rowSpacing={{ xs: 3 }}
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        // marginBottom={2}
        // marginTop={3}
        sx={{ width: "96%" }}
      >
        <Grid item lg={3} md={3} sm={6} xs={11} marginTop={3}>
          <IndicatorCard
            image={earningImage}
            title={`R$ ${summarize?.invested_amount?.toFixed(2)}`}
            subtitle="de total investido"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={11} marginTop={3}>
          <IndicatorCard
            image={indicatorsImage}
            title={`${summarize?.count_investiments}`}
            subtitle="da contagem de investimentos"
          />
        </Grid>
        <Grid item lg={3} md={3} sm={6} xs={11} marginTop={3}>
          <IndicatorCard
            image={expensesImage}
            // title={`R$ ${budget?.sum_expense?.toFixed(2)}`}
            title={`${summarize?.average_month_profitability?.toFixed(2)}`}
            subtitle="de média de rentabilidade mensal"
          />
        </Grid>

        <Grid item lg={3} md={3} xs={11} marginTop={3}>
          <IndicatorCard
            image={indicatorsComingSoon}
            title={`Em breve`}
            subtitle="um novo recurso para você"
          />
        </Grid>
      </Grid>

      <Grid
        container
        columnSpacing={3}
        marginLeft={2}
        marginRight={2}
        marginTop={3}
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
                Metas - por porcentagem esperada
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
                Estatísticas - tipo de investimento
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
            <CardActions>
              <Button size="small" href="/estatisticas">
                Visualizar todos
              </Button>
            </CardActions>
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
                Estatísticas - ano de resgate
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
            <CardActions>
              <Button size="small" href="/estatisticas">
                Visualizar todos
              </Button>
            </CardActions>
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

              <InvestimentList
                investiments={investiments}
                onShowModal={() => setShowModalInvestiment(true)}
                onSetSelectedId={(id) => setSelectedIdInvestiment(id)}
              />
            </CardContent>
            <CardActions>
              <Button size="small" href="/investimentos">
                Visualizar todos
              </Button>
            </CardActions>
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
                Investimentos resgatados
              </Typography>

              <InvestimentList
                investiments={investimentsRedeemed}
                onShowModal={() => setShowModalInvestiment(true)}
                onSetSelectedId={(id) => setSelectedIdInvestiment(id)}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardContainer;
