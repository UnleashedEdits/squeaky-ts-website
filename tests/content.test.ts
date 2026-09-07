import { describe, expect, it } from "vitest";
import { business, surfaces } from "../src/data/business";

describe("customer-facing content", () => {
  it("keeps every surface image distinct", () => {
    const images = Object.values(surfaces).map((surface) => surface.image);
    expect(new Set(images).size).toBe(images.length);
  });

  it("keeps surface descriptions natural instead of forcing second person", () => {
    for (const surface of Object.values(surfaces)) {
      expect(`${surface.method} ${surface.protection}`).not.toMatch(/^(you get|your)\b/i);
    }
  });

  it("uses a concise primary action", () => {
    expect(business.primaryCta).toBe("Get a Free Estimate");
  });
});
