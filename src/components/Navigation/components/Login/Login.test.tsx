import { render } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi, vitest } from "vitest";

import Login from "./Login";

const mockUser = vi.fn();

vitest.mock("@auth0/nextjs-auth0/client", () => {
  return {
    useUser: () => mockUser(),
  };
});

describe("Renders a Login Component", () => {
  beforeEach(() => {
    mockUser.mockClear();
  });

  test("Login Component fully renders", () => {
    mockUser.mockReturnValueOnce({});
    const login = render(<Login />);
    expect(login).toBeTruthy();
  });

  test("renders a login button", () => {
    mockUser.mockReturnValueOnce({});
    const login = render(<Login />);
    const button = login.getByText("Login");

    expect(button).toBeInTheDocument();
  });

  test("renders logout button if a user is logged in", () => {
    mockUser.mockReturnValue({ user: true });

    const logout = render(<Login />);
    const button = logout.getByText("Logout");
    const dashboard = logout.getByText("Dashboard");

    expect(button).toBeTruthy();
    expect(dashboard).toBeTruthy();
  });

  test("renders an error message if useUser detects an error", () => {
    mockUser.mockReturnValue({ error: { message: "Mock Error" } });
    const error = render(<Login />);
    const errorMessage = error.getByText("Mock Error");

    expect(errorMessage).toBeTruthy();
  });
});
