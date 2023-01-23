import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
} from "@mui/material";
import { StyledTableCell } from "../../constants/CustomStyles";

export function StatisticTable({ result }) {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell sx={{ width: 100 }}>#</StyledTableCell> */}
              <StyledTableCell>Nome</StyledTableCell>
              <StyledTableCell>Esperado</StyledTableCell>
              <StyledTableCell>Atual</StyledTableCell>
              <StyledTableCell>Lucro</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {result?.map((row) => {
              return (
                <TableRow key={row?.id} data-testid="row-table">
                  <TableCell>{row?.dream_name}</TableCell>
                  <TableCell>
                    {row?.sum_expected_net_value?.toFixed(2)}
                  </TableCell>
                  <TableCell>{row?.sum_invested_amount?.toFixed(2)}</TableCell>
                  <TableCell>{row?.expected_profit?.toFixed(2)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
