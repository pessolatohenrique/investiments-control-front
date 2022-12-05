import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
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
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import axios from "axios";
import moment from "moment";
import NumberFormat from "react-number-format";
import { Controller, useForm } from "react-hook-form";

import {
  THEME_COLOR,
  SNACKBAR_DIRECTION,
} from "../../constants/default_settings";
import { REQUIRED_MESSAGE } from "../../constants/messages";
import { INVESTIMENT_TYPES } from "../../constants/InvestimentTypes";
import { formatMoneyToDecimal } from "../../utils/formatters";
import useToast from "../../hooks/useToast";
import BreadcrumbsWrapper from "../../components/BreadcrumbsWrapper";

import InvestimentFactory from "../../factories/InvestimentFactory";

const RESET_FIELDS = {
  description: "",
  category: "",
  platform: "",
  net_value: "",
  type: "CHECKING_ACCOUNT",
};

function InvestimentForm() {
  const {
    control,
    register,
    watch,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: RESET_FIELDS,
  });

  const watchType = watch("type");

  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const investimentModel = new InvestimentFactory();
  const investimentCreated = investimentModel.create(watchType);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await axios.get(`/investiment/${id}`);
        return response?.data;
      } catch (error) {}
    }

    async function loadCategories() {
      try {
        const response = await axios.get(`/category`);
        return response?.data || [];
      } catch (error) {}
    }

    async function verifyUpdate() {
      if (id) {
        const data = await loadData();
        investimentCreated.loadFormData({ reset, data });
      }
    }

    verifyUpdate();
  }, [id, reset]);

  const {
    open,
    error,
    messageType,
    setError,
    showToast,
    hideToast,
  } = useToast();

  const verifyOperation = async (dataSubmit) => {
    if (id) {
      await axios.put(`/investiment/${id}`, {
        type: "CHECKING_ACCOUNT",
        ...dataSubmit,
      });
      return;
    }

    await axios.post(`/investiment`, {
      type: "CHECKING_ACCOUNT",
      ...dataSubmit,
    });
    reset(RESET_FIELDS);
  };

  const onSubmit = async (data) => {
    try {
      const dataSubmit = investimentCreated.formatDataSubmit({ data });
      await verifyOperation(dataSubmit);

      showToast("success");
      setError("Investimento salvo com sucesso!");
    } catch (error) {
      showToast();
      setError(error?.response?.data);
    }
  };

  return (
    <>
      <Container fixed>
        <Snackbar
          anchorOrigin={SNACKBAR_DIRECTION}
          open={open}
          autoHideDuration={6000}
          data-testid="snackbar"
          onClose={hideToast}
        >
          <Alert
            onClose={hideToast}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {error}
          </Alert>
        </Snackbar>
        <br />
        <Card>
          <CardContent>
            <BreadcrumbsWrapper
              parentLink={{ link: "/", label: "Dashboard" }}
              childrenLabel={id ? "Editar" : "Novo"}
            />
            <Typography
              gutterBottom
              variant="h5"
              component="h1"
              color={THEME_COLOR}
            >
              {id ? "Editar" : "Novo"} Investimento
            </Typography>

            <Grid item>
              <FormControl fullWidth>
                <InputLabel id="typeId">Tipo de investimento</InputLabel>

                <Controller
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <Select
                        labelId="type"
                        id="type"
                        fullWidth
                        inputProps={{ "data-testid": "type" }}
                        onChange={onChange}
                        value={value}
                        error={Boolean(error)}
                      >
                        {[...INVESTIMENT_TYPES].map((item) => {
                          return (
                            <MenuItem
                              key={item.id}
                              value={item.id}
                              inputProps={{
                                "data-testid": "type-option",
                              }}
                            >
                              {item.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                      {Boolean(error) && (
                        <FormHelperText error>
                          {REQUIRED_MESSAGE}
                        </FormHelperText>
                      )}
                    </>
                  )}
                  name="type"
                  control={control}
                  rules={{ required: true }}
                />
              </FormControl>
            </Grid>
            <br />

            {investimentCreated.renderForm({
              handleSubmit,
              onSubmit,
              errors,
              register,
              control,
            })}
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
export default InvestimentForm;
