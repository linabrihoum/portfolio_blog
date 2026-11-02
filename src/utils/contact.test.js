import { describe, expect, it } from "vitest";
import { CONTACT_MAX_LENGTH, validateContact, validateContactField } from "./contact";

describe("validateContactField", () => {
  it("requires every field", () => {
    expect(validateContactField("name", "")).toBe("Name is a required field");
    expect(validateContactField("email", "   ")).toBe("Email is a required field");
    expect(validateContactField("message", undefined)).toBe("Message is a required field");
  });

  it("rejects an invalid email address", () => {
    expect(validateContactField("email", "lina@")).toBe("Must be a valid email address");
    expect(validateContactField("email", "lina@example.com")).toBe("");
  });

  it("rejects text over the length limit", () => {
    const tooLong = "a".repeat(CONTACT_MAX_LENGTH.message + 1);
    expect(validateContactField("message", tooLong)).toBe("Message must be 5000 characters or fewer");
  });
});

describe("validateContact", () => {
  it("returns no errors for a complete message", () => {
    expect(validateContact({ name: "Ada", email: "ada@example.com", message: "Hi!" })).toEqual({});
  });

  it("returns an error per bad field", () => {
    expect(Object.keys(validateContact({ name: "Ada" }))).toEqual(["email", "message"]);
  });
});
