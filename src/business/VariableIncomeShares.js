import moment from "moment";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

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
}

export default VariableIncomeSHares;
