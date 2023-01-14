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

class VariableIncomeFunds {
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
              <strong>Média de dividendos: </strong>
              R$ {row.average_dividents}
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
    return "#fff2cc";
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
                  inputProps={{ "data-testid": "average_dividents" }}
                  fullWidth
                  label="Média de dividendos"
                  onChange={onChange}
                  value={value}
                  error={Boolean(error)}
                  helperText={Boolean(error) && REQUIRED_MESSAGE}
                />
              )}
              name="average_dividents"
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
    reset({
      type: "VARIABLE_INCOME_FUNDS",
      description: data?.description,
      category: data?.category,
      platform: data?.platform,
      average_dividents: data?.average_dividents,
      invested_amount: data?.invested_amount,
    });
  }

  formatDataSubmit({ data }) {
    const { invested_amount, average_dividents } = data;

    return {
      ...data,
      average_dividents: parseFloat(formatMoneyToDecimal(average_dividents)),
      invested_amount: parseFloat(formatMoneyToDecimal(invested_amount)),
    };
  }
}

export default VariableIncomeFunds;
