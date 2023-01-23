import moment from "moment";
import { render, screen } from "@testing-library/react";
import { GoalList } from "./GoalList";

const goals = [
  {
    _id: "63507dcba3f4aa14eb41e0ec",
    userId: "630ff7a767ae1e8f6a17631b",
    name: "Imóvel novo",
    total_value: 400000,
    initial_date: "2021-10-01T00:00:00.000Z",
    final_date: "2027-01-01T00:00:00.000Z",
    total_installments: 70,
    monthly_profitability: 0.72,
    invest_in_month: 4000,
    status: true,
    __v: 0,
    actual_value: 22753.4,
    actual_months: 15,
    remaining_months: 47,
    actual_value_percentage: "5.69",
    expected_value_percenage: "21.43",
  },
  {
    _id: "6357265b1e58f8dd69329d45",
    userId: "630ff7a767ae1e8f6a17631b",
    name: "Férias",
    total_value: 1000,
    initial_date: "2022-01-01T00:00:00.000Z",
    final_date: "2022-11-01T00:00:00.000Z",
    total_installments: 10,
    monthly_profitability: 0.72,
    invest_in_month: 4000,
    status: true,
    __v: 0,
    actual_value: 10000,
    actual_months: 12,
    remaining_months: -2,
    actual_value_percentage: "1000.00",
    expected_value_percenage: "120.00",
  },
  {
    _id: "63572785cdb7e7aacaff8934",
    userId: "630ff7a767ae1e8f6a17631b",
    name: "Imóvel",
    total_value: 400000,
    initial_date: "2022-01-01T00:00:00.000Z",
    final_date: "2026-01-01T00:00:00.000Z",
    total_installments: 72,
    monthly_profitability: 0.72,
    invest_in_month: 4000,
    status: true,
    __v: 0,
    actual_value: 420.5,
    actual_months: 12,
    remaining_months: 35,
    actual_value_percentage: "0.11",
    expected_value_percenage: "16.67",
  },
];

describe("Goal List", () => {
  it("should generate snapshot", () => {
    const { container } = render(<GoalList goals={goals} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<GoalList goals={goals} />);
    const rowTable = screen.getAllByTestId("card-item");
    expect(rowTable.length).toBe(3);
  });
});
