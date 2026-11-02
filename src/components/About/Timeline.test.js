// @vitest-environment jsdom
import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen, within } from "@testing-library/react";
import { Timeline, TimelineItem } from "./Timeline";

describe("Timeline", () => {
  afterEach(cleanup);

  it("lists each entry under the section heading", () => {
    render(
      <Timeline title="Experience">
        <TimelineItem title="Engineering Manager - Cloud & AI" org="IBM" time="November 2021 - present" body="Led a team" />
        <TimelineItem title="DevSecOps Lead Engineer" org="FIS" time="March 2020 - November 2021" />
      </Timeline>
    );

    expect(screen.getByRole("heading", { level: 2 }).textContent).toBe("Experience");
    const items = screen.getAllByRole("listitem");
    expect(items.map((item) => within(item).getByRole("heading", { level: 3 }).textContent)).toEqual([
      "Engineering Manager - Cloud & AI @IBM",
      "DevSecOps Lead Engineer @FIS",
    ]);
    expect(within(items[0]).getByText("November 2021 - present")).toBeTruthy();
    expect(within(items[0]).getByText("Led a team")).toBeTruthy();
  });

  it("shows a subtitle and leaves out the parts an entry doesn't have", () => {
    render(
      <Timeline title="Education">
        <TimelineItem title="Masters of Science in Computer Science" subtitle="Specalization in Artificial Intelligence" time="Georgia Institute of Technology" />
      </Timeline>
    );

    const item = screen.getByRole("listitem");
    expect(within(item).getByRole("heading", { level: 4 }).textContent).toBe("Specalization in Artificial Intelligence");
    expect(within(item).getByRole("heading", { level: 3 }).textContent).not.toContain("@");
    expect(item.querySelector("p")).toBeNull();
  });

  it("hides the decorative line and markers from screen readers", () => {
    const { container } = render(
      <Timeline title="Education">
        <TimelineItem title="Degree" />
      </Timeline>
    );
    expect(container.querySelector("figure").getAttribute("aria-hidden")).toBe("true");
    expect(container.querySelector("ul").previousElementSibling.getAttribute("aria-hidden")).toBe("true");
  });
});
