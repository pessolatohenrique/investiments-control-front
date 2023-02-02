import axios from "axios";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import App from "../../App";
import InvestimentContainer from "./InvestimentContainer";

jest.mock("axios");

function mockCallValid() {
  axios.get.mockResolvedValueOnce({
    data: [
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
    ],
  });
}

describe("Investiment Container", () => {
  beforeAll(() => {
    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: {
        value: process.env.REACT_APP_API_DEFAULT_EMAIL,
      },
    });
    fireEvent.click(submitBtn);
  });

  it("should generate snapshot", () => {
    const { container } = render(<InvestimentContainer />);
    expect(container).toMatchSnapshot();
  });

  it("should render investiments after request", async () => {
    mockCallValid();
    render(<InvestimentContainer />);

    await waitForElement(() => screen.getAllByText("Investimentos"));
  });
});
