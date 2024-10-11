import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, describe, it, vi } from "vitest";

import App from "./App";
import { AudioManager } from "./audio/AudioManager";

vi.mock("./audio/AudioManager");

describe("App", () => {
  it("initializes AudioManager when the button is clicked", async () => {
    const mockInitialize = vi.fn();
    AudioManager.prototype.initialize = mockInitialize;

    render(<App />);
    const button = screen.getByText(/Begin/i);
    await userEvent.click(button);

    expect(mockInitialize).toHaveBeenCalled();
  });
});
