import moment from "moment";
import { Typography, List, ListItem, ListItemText } from "@mui/material";

class EmergencyReserve {
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
              <strong>Valor líquido: </strong>
              R$ {row.net_value}
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
    return "#d9d2e9";
  }
}

export default EmergencyReserve;
