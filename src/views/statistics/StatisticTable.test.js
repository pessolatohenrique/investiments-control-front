import moment from "moment";
import { render, screen } from "@testing-library/react";
import { StatisticTable } from "./StatisticTable";

const result = [
  {
    dream_name: "rico",
    sum_expected_net_value: 1501.9,
    sum_invested_amount: 1091,
    expected_profit: 410.9,
  },
  {
    dream_name: "clear",
    sum_expected_net_value: 2560,
    sum_invested_amount: 2000,
    expected_profit: 560,
  },
];

describe("Goal List", () => {
  it("should generate snapshot", () => {
    const { container } = render(<StatisticTable result={result} />);
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<StatisticTable result={result} />);
    const rowTable = screen.getAllByTestId("row-table");
    expect(rowTable.length).toBe(2);
  });
});
