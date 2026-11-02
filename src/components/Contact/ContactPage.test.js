// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import ContactPage from "./ContactPage";

const type = (label, value) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } });

const fillAll = () => {
  type("Name*", "Ada");
  type("Email*", "ada@example.com");
  type("Message*", "Hello!");
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

  it("shows every field and one Submit button right away, with no steps to click through", () => {
    expect(screen.getByLabelText("Name*")).toBeTruthy();
    expect(screen.getByLabelText("Email*")).toBeTruthy();
    expect(screen.getByLabelText("Message*").tagName).toBe("TEXTAREA");
    expect(screen.getAllByRole("button").map((b) => b.textContent)).toEqual(["Submit"]);
  });

  // The old form showed "thank you" without ever sending anything.
  it("sends the message when Submit is clicked, then thanks the visitor", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));

    fillAll();
    fireEvent.click(screen.getByText("Submit"));

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

    fillAll();
    fireEvent.click(screen.getByText("Submit"));

    expect((await screen.findByRole("alert")).textContent).toContain("couldn't be sent");
    expect(screen.queryByText(/Thank you for reaching out/)).toBeNull();
  });

  it("checks every field on Submit, sends nothing, and puts the cursor on the first problem", () => {
    type("Name*", "Ada");
    type("Email*", "not-an-email");
    fireEvent.click(screen.getByText("Submit"));

    expect(screen.getByText("Must be a valid email address")).toBeTruthy();
    expect(screen.getByText("message is a required field")).toBeTruthy();
    expect(screen.queryByText("name is a required field")).toBeNull();
    expect(document.activeElement).toBe(screen.getByLabelText("Email*"));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("clears a field's error once it's corrected", () => {
    fireEvent.click(screen.getByText("Submit"));
    expect(screen.getByText("name is a required field")).toBeTruthy();
    type("Name*", "Ada");
    expect(screen.queryByText("name is a required field")).toBeNull();
  });

  it("counts the message's characters against the limit", () => {
    type("Message*", "Hello!");
    expect(screen.getByText("6 / 5000")).toBeTruthy();
  });

  it("moves to the next field on Enter in name and email, without sending", () => {
    fireEvent.keyDown(screen.getByLabelText("Name*"), { key: "Enter" });
    expect(document.activeElement).toBe(screen.getByLabelText("Email*"));
    fireEvent.keyDown(screen.getByLabelText("Email*"), { key: "Enter" });
    expect(document.activeElement).toBe(screen.getByLabelText("Message*"));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("adds a new line on Enter in the message box, and sends on Ctrl+Enter", async () => {
    fetchMock.mockResolvedValue(new Response("{}", { status: 200 }));
    fillAll();
    const box = screen.getByLabelText("Message*");

    fireEvent.keyDown(box, { key: "Enter" });
    expect(fetchMock).not.toHaveBeenCalled();

    fireEvent.keyDown(box, { key: "Enter", ctrlKey: true });
    expect(await screen.findByText("Thank you for reaching out, Ada!")).toBeTruthy();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
