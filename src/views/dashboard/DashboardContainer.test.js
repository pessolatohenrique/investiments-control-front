import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import App from "../../App";
import DashboardContainer from "./DashboardContainer";

describe("Dashboard Container", () => {
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
    const { container } = render(<DashboardContainer />);
    expect(container).toMatchSnapshot();
  });
});
