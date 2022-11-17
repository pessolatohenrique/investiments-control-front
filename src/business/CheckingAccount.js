import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

class CheckingAccount {
  renderDetail(row) {
    return (
      <List variant="body2">
        <ListItem>
          <ListItemText disableTypography>
            <Typography variant="body2">
              <strong>Valor líquido: </strong>
              R$ {row.net_value}
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
}

export default CheckingAccount;
