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
import InvestimentFactory from "../../factories/InvestimentFactory";

export function InvestimentList({ investiments }) {
  return (
    <Grid container spacing={2}>
      {[...investiments].map((row) => {
        const investimentModel = new InvestimentFactory();
        const investimentCreated = investimentModel.create(row?.type);

        return (
          <Grid item xs={4} key={row.id}>
            <Card data-testid="card-item">
              <CardContent sx={{ minHeight: 265 }}>
                <Typography variant="h6" component="div" color="text.secondary">
                  {row?.description}
                </Typography>
                <List variant="body2">
                  {investimentCreated.renderDetail(row)}
                </List>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
