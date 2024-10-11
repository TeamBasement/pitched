import { render, screen, fireEvent } from "@testing-library/react";
import { expect, describe, it, vi } from "vitest";

import App from "./App";
import { AudioManager } from "./audio/AudioManager";

vi.mock("./audio/AudioManager");

describe("App", () => {
  it("initializes AudioManager when the button is clicked", () => {
    const mockInitialize = vi.fn();
    AudioManager.prototype.initialize = mockInitialize;

    render(<App />);
    const button = screen.getByText(/Begin/i);
    fireEvent.click(button);

    expect(mockInitialize).toHaveBeenCalled();
  });
});
