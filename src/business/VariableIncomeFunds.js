import moment from "moment";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

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
}

export default VariableIncomeFunds;
