import axios from "axios";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import App from "../../App";
import StatisticContainer from "./StatisticContainer";

jest.mock("axios");

function mockCallValid() {
  axios.get.mockResolvedValueOnce({
    data: [
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
    ],
  });
}

describe("Statistic Container", () => {
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
    const { container } = render(<StatisticContainer />);
    expect(container).toMatchSnapshot();
  });

  it("should render investiments after request", async () => {
    mockCallValid();
    render(<StatisticContainer />);

    await waitForElement(() => screen.getAllByText("Por plataforma"));
  });
});
