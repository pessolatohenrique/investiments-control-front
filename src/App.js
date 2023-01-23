import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isPageWithoutLogin } from "./utils/pages";
import useToken from "./hooks/useToken";
import AppBarWrapper from "./components/AppBarWrapper";
import NotFound from "./components/NotFound";
import LoginForm from "./views/register/LoginForm";
import RegisterContainer from "./views/register/RegisterContainer";
import DashboardContainer from "./views/dashboard/DashboardContainer";
import InvestimentContainer from "./views/investiments/InvestimentContainer";
import InvestimentForm from "./views/investiments/InvestimentForm";
import StatisticContainer from "./views/statistics/StatisticContainer";

function App(props) {
  const { token, setToken, setRefreshToken } = useToken();

  if (!token && !isPageWithoutLogin()) {
    return <LoginForm setToken={setToken} setRefreshToken={setRefreshToken} />;
  }

  return (
    <Router>
      <AppBarWrapper />

      <Switch>
        <Route exact path="/">
          <DashboardContainer />
        </Route>

        <Route exact path="/investimentos">
          <InvestimentContainer />
        </Route>

        <Route exact path="/investimento/novo">
          <InvestimentForm />
        </Route>

        <Route exact path="/investimento/:id">
          <InvestimentForm />
        </Route>

        <Route exact path="/usuario/novo">
          <RegisterContainer />
        </Route>

        <Route exact path="/estatisticas">
          <StatisticContainer />
        </Route>

        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
