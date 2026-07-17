import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SettingsForm from "./SettingsForm";
import {
  VALIDATION_MESSAGES,
  validateSettingsForm,
} from "../utils/settingsFormValidation";

describe("validateSettingsForm", () => {
  it("returns required errors when fields are empty", () => {
    const errors = validateSettingsForm({
      displayName: "",
      email: "",
      theme: "light",
      emailNotifications: false,
    });

    expect(errors.displayName).toBe(VALIDATION_MESSAGES.displayNameRequired);
    expect(errors.email).toBe(VALIDATION_MESSAGES.emailRequired);
  });

  it("returns a minimum length error for short display names", () => {
    const errors = validateSettingsForm({
      displayName: "A",
      email: "user@example.com",
      theme: "light",
      emailNotifications: false,
    });

    expect(errors.displayName).toBe(VALIDATION_MESSAGES.displayNameMinLength);
    expect(errors.email).toBeUndefined();
  });

  it("returns an email format error for invalid emails", () => {
    const errors = validateSettingsForm({
      displayName: "Jane Doe",
      email: "not-an-email",
      theme: "light",
      emailNotifications: false,
    });

    expect(errors.email).toBe(VALIDATION_MESSAGES.emailInvalid);
    expect(errors.displayName).toBeUndefined();
  });

  it("returns no errors for valid values", () => {
    const errors = validateSettingsForm({
      displayName: "Jane Doe",
      email: "user@example.com",
      theme: "dark",
      emailNotifications: true,
    });

    expect(errors).toEqual({});
  });
});

describe("SettingsForm validation behavior", () => {
  it("shows field errors when the form is submitted empty", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(
      screen.getByText(VALIDATION_MESSAGES.displayNameRequired),
    ).toBeInTheDocument();
    expect(screen.getByText(VALIDATION_MESSAGES.emailRequired)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a display name error for one-character names", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display Name"), "A");
    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(
      screen.getByText(VALIDATION_MESSAGES.displayNameMinLength),
    ).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows an email format error for invalid emails", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "invalid-email");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(screen.getByText(VALIDATION_MESSAGES.emailInvalid)).toBeInTheDocument();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a success message after a valid submission", async () => {
    const user = userEvent.setup();

    render(<SettingsForm />);

    await user.type(screen.getByLabelText("Display Name"), "Jane Doe");
    await user.type(screen.getByLabelText("Email"), "user@example.com");
    await user.click(screen.getByRole("button", { name: "Save Changes" }));

    expect(screen.getByRole("status")).toHaveTextContent(
      "Settings saved successfully.",
    );
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});
