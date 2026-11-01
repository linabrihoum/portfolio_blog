// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";

const type = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const fillAndSubmit = () => {
  fireEvent.click(screen.getByText("Start"));
  type("Name*", "Ada");
  fireEvent.click(screen.getByText("Next"));
  type("Email*", "ada@example.com");
  fireEvent.click(screen.getByText("Next"));
  type("Message*", "Hello!");
  fireEvent.click(screen.getByText("Submit"));
};

describe("ContactPage", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.spyOn(console, "error").mockImplementation(() => {});
    render(<ContactPage />);
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // The old form showed "thank you" without ever sending anything.
  it("sends the message when Submit is clicked, then thanks the visitor", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    fillAndSubmit();

    expect(await screen.findByText("Thank you for reaching out, Ada!")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/contact");
    expect(JSON.parse(options.body)).toMatchObject({
      name: "Ada",
      email: "ada@example.com",
      message: "Hello!",
    });
  });

  it("shows an error instead of a thank-you when sending fails", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 502 }));

    fillAndSubmit();

    expect((await screen.findByRole("alert")).textContent).toContain("couldn't be sent");
    expect(screen.queryByText(/Thank you for reaching out/)).toBeNull();
  });

  it("doesn't move on until the current field is valid", () => {
    fireEvent.click(screen.getByText("Start"));
    fireEvent.click(screen.getByText("Next"));

    expect(screen.getByText("name is a required field")).toBeTruthy();
    expect(screen.getByLabelText("Name*")).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
