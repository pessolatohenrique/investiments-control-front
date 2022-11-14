import React from "react";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export function GoalList({ goals }) {
  return (
    <Grid container spacing={2}>
      {[...goals].map((row) => {
        return (
          <Grid item xs={4} key={row.id}>
            <Card data-testid="card-item">
              <CardContent>
                <Typography variant="h6" component="div" color="text.secondary">
                  {row?.name}
                </Typography>
                <List variant="body2">
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Porcentagem atual: </strong>
                        {row?.actual_value_percentage} %
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Porcentagem esperada: </strong>
                        {row?.expected_value_percenage} %
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Valor total: </strong>R$ {row?.total_value}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Valor atual: </strong>R$ {row?.actual_value}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Meses restantes: </strong>
                        {row?.remaining_months}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Meses atuais: </strong>
                        {row?.actual_months}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Total de meses: </strong>
                        {row?.total_installments}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Data de início: </strong>{" "}
                        {moment(row?.initial_date).format("DD/MM/YYYY")}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <ListItemText disableTypography>
                      <Typography variant="body2">
                        <strong>Data de fim: </strong>{" "}
                        {moment(row?.final_date).format("DD/MM/YYYY")}
                      </Typography>
                    </ListItemText>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
