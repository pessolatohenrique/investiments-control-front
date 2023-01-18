import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Container,
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  Snackbar,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";

import {
  MODAL_CONFIRM_TITLE,
  MODAL_CONFIRM_SUBTITLE,
} from "../../constants/messages";

import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";
import ModalWrapper from "../../components/ModalWrapper";

import useToast from "../../hooks/useToast";
import { InvestimentList } from "./InvestimentList";

function InvestimentContainer() {
  // custom hooks
  const { open, error, setError, showToast, hideToast } = useToast();

  const [investiments, setInvestiments] = useState([]);
  const [investimentsRedeemed, setInvestimentsRedeemed] = useState([]);

  // modal
  const [showModalInvestiment, setShowModalInvestiment] = useState(false);
  const [selectedIdInvestiment, setSelectedIdInvestiment] = useState("");

  async function getInvestiments() {
    try {
      const response = await axios.get(`/investiment`);
      const investimentsResponse = response?.data.filter(
        (item) => !item.has_redeemed
      );
      const investimentsRedeemedResponse = [...response?.data].filter(
        (item) => item.has_redeemed
      );

      setInvestiments(investimentsResponse);
      setInvestimentsRedeemed(investimentsRedeemedResponse);
    } catch (error) {
      showToast();
      setError(error?.response?.data?.message || null);
    }
  }

  useEffect(() => {
    getInvestiments();
  }, []);

  return (
    <>
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

        {/* <br /> */}
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
                <BreadcrumbsWrapper
                  parentLink={{ link: "/", label: "Dashboard" }}
                  childrenLabel={"Investimentos"}
                />
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
                <BreadcrumbsWrapper
                  parentLink={{ link: "/", label: "Dashboard" }}
                  childrenLabel={"Investimentos"}
                />
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
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default InvestimentContainer;
