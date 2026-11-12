import { describe, expect, it } from "vitest";
import { evaluateTradeRequest } from "../src/risk/risk-engine";

const safeRequest = {
  accountMode: "demo" as const,
  riskUsd: 25,
  dailyRealizedLossUsd: 0,
  openPositionsAccountWide: 0,
  inAppApproved: true,
  telegramApproved: true,
  entryPrice: 1.085,
  stopLossPrice: 1.082
};

describe("ACE Forex risk gate", () => {
  it("allows a valid demo request", () => {
    expect(evaluateTradeRequest(safeRequest)).toEqual({ allowed: true });
  });
  it("rejects live mode", () => {
    expect(evaluateTradeRequest({ ...safeRequest, accountMode: "live" }).allowed).toBe(false);
  });
  it("rejects risk above $25", () => {
    expect(evaluateTradeRequest({ ...safeRequest, riskUsd: 25.01 }).allowed).toBe(false);
  });
  it("rejects at the $50 daily loss limit", () => {
    expect(evaluateTradeRequest({ ...safeRequest, dailyRealizedLossUsd: 50 }).allowed).toBe(false);
  });
  it("rejects when an account-wide position is already open", () => {
    expect(evaluateTradeRequest({ ...safeRequest, openPositionsAccountWide: 1 }).allowed).toBe(false);
  });
  it("requires both approval channels", () => {
    expect(evaluateTradeRequest({ ...safeRequest, telegramApproved: false }).allowed).toBe(false);
  });
});
