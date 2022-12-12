import moment from "moment";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import NumberFormat from "react-number-format";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { REQUIRED_MESSAGE } from "../constants/messages";
import { INDEXER_TYPES } from "../constants/IndexerTypes";
import { formatMoneyToDecimal } from "../utils/formatters";

class FixedIncome {
  renderDetail(row) {
    return (
      <List variant="body2">
        <ListItem>
          <ListItemText disableTypography>
            <Typography variant="body2">
              <strong>Tipo: </strong>
              {row.type}
            </Typography>
            <Typography variant="body2">
              <strong>Indexador: </strong>
              {row?.indexer?.name} + {row?.indexer?.contracted_rate}
            </Typography>
            <Typography variant="body2">
              <strong>Rentabilidade mensal: </strong>
              {row?.monthly_profitability}
            </Typography>
            <Typography variant="body2">
              <strong>Vencimento em: </strong>
              {moment(row?.final_date).format("DD/MM/YYYY")}
            </Typography>
            <Typography variant="body2">
              <strong>Valor esperado: </strong>
              R$ {row.expected_net_value}
            </Typography>
            <Typography variant="body2">
              <strong>Valor investido: </strong>
              R$ {row.invested_amount}
            </Typography>
            <Typography variant="body2">
              <strong>Categoria: </strong>
              {row.category}
            </Typography>
            <Typography variant="body2">
              <strong>Plataforma: </strong>
              {row.platform}
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    );
  }

  getIdentifyColor() {
    return "#d9ead3";
  }

  renderForm({ handleSubmit, onSubmit, errors, register, control, goals }) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container direction={"column"} spacing={2}>
          <Grid item>
            <TextField
              fullWidth
              autoFocus
              id="description"
              label="Descrição"
              inputProps={{ "data-testid": "description" }}
              error={Boolean(errors.description)}
              helperText={errors.description && REQUIRED_MESSAGE}
              {...register("description", {
                required: true,
              })}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="category"
              label="Categoria"
              inputProps={{ "data-testid": "category" }}
              error={Boolean(errors.category)}
              helperText={errors.category && REQUIRED_MESSAGE}
              {...register("category", {
                required: true,
              })}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="goalId">Meta</InputLabel>

              <Controller
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Select
                      labelId="goalId"
                      id="goalId"
                      fullWidth
                      inputProps={{ "data-testid": "goalId" }}
                      onChange={onChange}
                      value={value}
                      error={Boolean(error)}
                    >
                      {[...goals].map((item) => {
                        return (
                          <MenuItem
                            key={item._id}
                            value={item._id}
                            inputProps={{
                              "data-testid": "goalId-option",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {Boolean(error) && (
                      <FormHelperText error>{REQUIRED_MESSAGE}</FormHelperText>
                    )}
                  </>
                )}
                name="goalId"
                control={control}
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Data de vencimento"
                    inputProps={{ "data-testid": "final_date" }}
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={onChange}
                    error={Boolean(error)}
                    helperText={Boolean(error) && REQUIRED_MESSAGE}
                    renderInput={(params) => (
                      <TextField
                        inputProps={{ "data-testid": "final_date" }}
                        fullWidth
                        {...params}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
              name="final_date"
              control={control}
              rules={{ required: true }}
            />
          </Grid>

          <Grid item>
            <FormControl fullWidth>
              <InputLabel id="indexer.name">Indexador</InputLabel>

              <Controller
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <>
                    <Select
                      labelId="indexer.name"
                      id="indexer.name"
                      fullWidth
                      inputProps={{ "data-testid": "indexer.name" }}
                      onChange={onChange}
                      value={value}
                      error={Boolean(error)}
                    >
                      {[...INDEXER_TYPES].map((item) => {
                        return (
                          <MenuItem
                            key={item.id}
                            value={item.id}
                            inputProps={{
                              "data-testid": "indexer.name-option",
                            }}
                          >
                            {item.name}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    {Boolean(error) && (
                      <FormHelperText error>{REQUIRED_MESSAGE}</FormHelperText>
                    )}
                  </>
                )}
                name="indexer.name"
                control={control}
                rules={{ required: true }}
              />
            </FormControl>
          </Grid>

          <Grid item>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  // prefix={"R$ "}
                  suffix={"%"}
                  customInput={TextField}
                  inputProps={{ "data-testid": "indexer.contracted_rate" }}
                  fullWidth
                  label="Taxa contratada"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="indexer.contracted_rate"
              control={control}
              rules={{ required: true }}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              id="platform"
              label="Plataforma"
              inputProps={{ "data-testid": "platform" }}
              error={Boolean(errors.platform)}
              helperText={errors.platform && REQUIRED_MESSAGE}
              {...register("platform", {
                required: true,
              })}
            />
          </Grid>

          <Grid item>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  // prefix={"R$ "}
                  suffix={"%"}
                  customInput={TextField}
                  inputProps={{ "data-testid": "monthly_profitability" }}
                  fullWidth
                  label="Rentabilidade mensal"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="monthly_profitability"
              control={control}
              rules={{ required: true }}
            />
          </Grid>

          <Grid item>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"R$ "}
                  customInput={TextField}
                  inputProps={{ "data-testid": "invested_amount" }}
                  fullWidth
                  label="Valor investido"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="invested_amount"
              control={control}
              rules={{ required: true }}
            />
          </Grid>

          <Grid item>
            <Controller
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <NumberFormat
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  prefix={"R$ "}
                  customInput={TextField}
                  inputProps={{ "data-testid": "expected_net_value" }}
                  fullWidth
                  label="Valor líquido esperado"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="expected_net_value"
              control={control}
              rules={{ required: true }}
            />
          </Grid>

          <Grid item>
            <Button
              variant="contained"
              type="submit"
              data-testid="submit-button"
            >
              Salvar
            </Button>
          </Grid>
        </Grid>
      </form>
    );
  }

  loadFormData({ reset, data }) {
    const final_date = moment(data?.final_date, "YYYY-MM-DD");

    reset({
      type: "FIXED_INCOME",
      goalId: data?.goalId,
      description: data?.description,
      category: data?.category,
      platform: data?.platform,
      net_value: data?.net_value,
      final_date,
      indexer: data?.indexer,
      monthly_profitability: data?.monthly_profitability,
      invested_amount: data?.invested_amount,
      net_value: data?.net_value,
      expected_net_value: data?.expected_net_value,
    });
  }

  formatDataSubmit({ data }) {
    const {
      final_date,
      monthly_profitability,
      invested_amount,
      net_value,
      expected_net_value,
      indexer,
    } = data;

    return {
      ...data,
      final_date: moment(final_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      monthly_profitability: parseFloat(
        formatMoneyToDecimal(monthly_profitability)
      ),
      indexer: {
        name: indexer?.name,
        contracted_rate: parseFloat(
          formatMoneyToDecimal(indexer?.contracted_rate)
        ),
      },
      invested_amount: parseFloat(formatMoneyToDecimal(invested_amount)),
      expected_net_value: parseFloat(formatMoneyToDecimal(expected_net_value)),
    };
  }
}

export default FixedIncome;
