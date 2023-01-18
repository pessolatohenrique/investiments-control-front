import React from "react";
import moment from "moment";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  List,
  Button,
  ListItem,
  ListItemText,
} from "@mui/material";
import InvestimentFactory from "../../factories/InvestimentFactory";

export function InvestimentList({
  investiments,
  onSetSelectedId,
  onShowModal,
}) {
  return (
    <Grid container spacing={2}>
      {[...investiments].map((row) => {
        const investimentModel = new InvestimentFactory();
        const investimentCreated = investimentModel.create(row?.type);

        return (
          <Grid item xs={4} key={row.id}>
            <Card
              data-testid="card-item"
              sx={{
                borderLeft: `5px solid ${investimentCreated?.getIdentifyColor()}`,
              }}
            >
              <CardContent sx={{ minHeight: 265 }}>
                <Typography variant="h6" component="div" color="text.secondary">
                  {row?.description}
                </Typography>
                <List variant="body2">
                  {investimentCreated.renderDetail(row)}
                </List>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() =>
                    window.location.replace(`/investimento/${row?._id}`)
                  }
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    onSetSelectedId(row?._id);
                    onShowModal();
                  }}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
