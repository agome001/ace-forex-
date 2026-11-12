export type AccountMode = "demo" | "live";
export interface TradeRequest {
  accountMode: AccountMode;
  riskUsd: number;
  dailyRealizedLossUsd: number;
  openPositionsAccountWide: number;
  inAppApproved: boolean;
  telegramApproved: boolean;
  entryPrice: number;
  stopLossPrice: number;
}
export type RiskDecision =
  | { allowed: true }
  | { allowed: false; reason: string };

export const MAX_RISK_PER_TRADE_USD = 25;
export const MAX_DAILY_LOSS_USD = 50;
export const MAX_OPEN_POSITIONS_ACCOUNT_WIDE = 1;

/** Server-side preflight. Rejects unless every safety condition is verifiably true. */
export function evaluateTradeRequest(request: TradeRequest): RiskDecision {
  if (request.accountMode !== "demo") return { allowed: false, reason: "Demo mode only" };
  if (!Number.isFinite(request.riskUsd) || request.riskUsd <= 0 ||
      request.riskUsd > MAX_RISK_PER_TRADE_USD) {
    return { allowed: false, reason: "Risk must be greater than $0 and no more than $25" };
  }
  if (!Number.isFinite(request.dailyRealizedLossUsd) ||
      request.dailyRealizedLossUsd >= MAX_DAILY_LOSS_USD) {
    return { allowed: false, reason: "Daily loss limit reached or account loss is unknown" };
  }
  if (!Number.isInteger(request.openPositionsAccountWide) ||
      request.openPositionsAccountWide >= MAX_OPEN_POSITIONS_ACCOUNT_WIDE) {
    return { allowed: false, reason: "Account-wide open-position limit reached or state is unknown" };
  }
  if (!request.inAppApproved || !request.telegramApproved) {
    return { allowed: false, reason: "Both in-app and Telegram approvals are required" };
  }
  if (!Number.isFinite(request.entryPrice) || !Number.isFinite(request.stopLossPrice) ||
      request.entryPrice <= 0 || request.stopLossPrice <= 0 ||
      request.entryPrice === request.stopLossPrice) {
    return { allowed: false, reason: "Valid entry and stop-loss prices are required" };
  }
  return { allowed: true };
}
