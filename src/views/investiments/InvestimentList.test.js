import moment from "moment";
import { render, screen } from "@testing-library/react";
import { InvestimentList } from "./InvestimentList";

const investiments = [
  {
    _id: "6375618ec9e12ca82d98afa7",
    userId: "630ff7a767ae1e8f6a17631b",
    type: "CHECKING_ACCOUNT",
    category: "Conta corrente",
    description: "Conta corrente",
    platform: "Itaú",
    net_value: 5000,
    __v: 0,
    profit: 0,
  },
  {
    _id: "637561adc9e12ca82d98afaa",
    userId: "630ff7a767ae1e8f6a17631b",
    goalId: "63507dcba3f4aa14eb41e0ec",
    type: "FIXED_INCOME",
    category: "Tesouro Direto",
    description: "IPCA+ 2026",
    indexer: {
      name: "IPCA",
      contracted_rate: 5.59,
      _id: "63979a5cb3871063914d5c33",
    },
    platform: "Clear",
    final_date: "2022-12-13T00:00:00.000Z",
    monthly_profitability: 0.95,
    invested_amount: 3000,
    expected_net_value: 5000,
    __v: 0,
    net_value: null,
    has_redeemed: false,
    expected_profit: 2000,
  },
];

describe("Goal List", () => {
  it("should generate snapshot", () => {
    const { container } = render(
      <InvestimentList investiments={investiments} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should generate table", () => {
    render(<InvestimentList investiments={investiments} />);
    const rowTable = screen.getAllByTestId("card-item");
    expect(rowTable.length).toBe(2);
  });
});
