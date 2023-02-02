import axios from "axios";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
  waitForDomChange,
  waitFor,
} from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";
import { PROJECT_NAME } from "../../constants/default_settings";
import { WRONG_PASSWORD_MESSAGE } from "../../constants/messages";
import App from "../../App";
import LoginForm from "./LoginForm";
import useToken from "../../hooks/useToken";

jest.mock("axios");

function mockCallValid() {
  axios.post.mockResolvedValueOnce({
    data: {
      accessToken: "generated-value",
      refreshToken: "generated-value",
    },
  });
}

function mockCallInvalid() {
  axios.post.mockRejectedValueOnce({
    status: 401,
    statusText: "Unauthorized",
    data: {
      accessToken: "generated-value",
      refreshToken: "generated-value",
    },
  });
}

describe("Login Form", () => {
  it("should generate snapshot", () => {
    const { setToken } = renderHook(() => useToken());
    const { container } = render(<LoginForm setToken={setToken} />);
    expect(container).toMatchSnapshot();
  });

  it("should login when using valid credentials", async () => {
    mockCallValid();

    render(<App />);
    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: { value: process.env.REACT_APP_API_DEFAULT_PASSWORD },
    });
    fireEvent.click(submitBtn);

    await waitForElement(() => screen.getByText(PROJECT_NAME));
  });

  it("should not login when password is invalid", async () => {
    mockCallInvalid();

    const { setToken } = renderHook(() => useToken());
    render(<LoginForm setToken={setToken} />);

    const submitBtn = screen.getByTestId("submit-button");
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");

    fireEvent.input(username, {
      target: { value: process.env.REACT_APP_API_DEFAULT_USER },
    });
    fireEvent.input(password, {
      target: { value: "incorrectpassword" },
    });
    fireEvent.click(submitBtn);

    await waitFor(() => expect(screen.getAllByText("Entrar")));
  });
});
