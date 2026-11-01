import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import siteMetadata from "@/src/utils/siteMetaData";
import { POST } from "./route";

const message = { name: "Ada", email: "ada@example.com", message: "Hello!" };

const post = (body) =>
  POST(
    new Request("http://localhost/api/contact", {
      method: "POST",
      body: typeof body === "string" ? body : JSON.stringify(body),
    })
  );

describe("POST /api/contact", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue(new Response("{}", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("RESEND_API_KEY", "test-key");
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("sends the message to the site email through Resend", async () => {
    const response = await post(message);

    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.resend.com/emails");
    expect(options.headers.Authorization).toBe("Bearer test-key");
    const sent = JSON.parse(options.body);
    expect(sent.to).toEqual([siteMetadata.email]);
    expect(sent.reply_to).toBe("ada@example.com");
    expect(sent.text).toContain("Hello!");
  });

  it("rejects invalid input without sending", async () => {
    const response = await post({ ...message, email: "not-an-email" });

    expect(response.status).toBe(400);
    expect((await response.json()).errors.email).toBe("Must be a valid email address");
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a body that isn't JSON", async () => {
    expect((await post("not json")).status).toBe(400);
  });

  it("quietly drops messages from bots that fill the honeypot", async () => {
    const response = await post({ ...message, website: "spam.example" });

    expect(response.status).toBe(200);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("reports an error when Resend fails", async () => {
    fetchMock.mockResolvedValue(new Response("nope", { status: 500 }));

    expect((await post(message)).status).toBe(502);
  });

  it("reports an error when the API key is missing", async () => {
    vi.stubEnv("RESEND_API_KEY", "");

    expect((await post(message)).status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
