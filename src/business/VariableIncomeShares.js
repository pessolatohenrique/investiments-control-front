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

class VariableIncomeSHares {
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
              <strong>Prazo estimado: </strong>
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
              <strong>Lucro esperado: </strong>
              R$ {row?.expected_profit?.toFixed(2)}
            </Typography>
            <Typography variant="body2">
              <strong>Preço médio adquirido: </strong>
              R$ {row.average_price}
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
    return "#ead1dc";
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
              label="Abreviação"
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
                  prefix={"R$ "}
                  customInput={TextField}
                  inputProps={{ "data-testid": "average_price" }}
                  fullWidth
                  label="Média de preço"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="average_price"
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
      type: "VARIABLE_INCOME_SHARES",
      goalId: data?.goalId,
      description: data?.description,
      category: data?.category,
      platform: data?.platform,
      net_value: data?.net_value,
      final_date,
      average_price: data?.average_price,
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
      expected_net_value,
      average_price,
    } = data;

    return {
      ...data,
      final_date: moment(final_date, "DD/MM/YYYY").format("YYYY-MM-DD"),
      monthly_profitability: parseFloat(
        formatMoneyToDecimal(monthly_profitability)
      ),
      average_price: parseFloat(formatMoneyToDecimal(average_price)),
      invested_amount: parseFloat(formatMoneyToDecimal(invested_amount)),
      expected_net_value: parseFloat(formatMoneyToDecimal(expected_net_value)),
    };
  }
}

export default VariableIncomeSHares;
