import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import CreateUser from "../src/components/CreateUser";

// Mockataan axios-kirjasto
vi.mock("axios");

test("renders Create User form", () => {
  render(<CreateUser />);

  expect(screen.getByText(/Create User/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /Create/i })).toBeInTheDocument();
});

test("submits form and displays success message", async () => {
  axios.post.mockResolvedValueOnce({ data: { name: "Test User" } });

  render(<CreateUser />);

  fireEvent.change(screen.getByPlaceholderText(/Name/i), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create/i }));

  expect(await screen.findByText(/User created successfully: Test User/i)).toBeInTheDocument();
});

test("handles API error and shows error message", async () => {
  axios.post.mockRejectedValueOnce({
    response: { data: { error: "Email already exists" } },
  });

  render(<CreateUser />);

  fireEvent.change(screen.getByPlaceholderText(/Name/i), {
    target: { value: "Test User" },
  });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: "test@example.com" },
  });
  fireEvent.click(screen.getByRole("button", { name: /Create/i }));

  expect(await screen.findByText(/Error: Email already exists/i)).toBeInTheDocument();
});
