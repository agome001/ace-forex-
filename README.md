# ACE Forex

Demo-only foundation for a multi-user forex signal and execution platform.

## Safety requirements
- FOREX.com MT5 demo environment only. Live trading is intentionally unsupported.
- Require both in-app and Telegram approval before every order.
- Risk cap: $25 per trade.
- Daily loss stop: $50.
- Maximum one open position account-wide.
- Scan only enabled pairs.
- A signal is eligible only after liquidity sweep, market structure shift, displacement, and fair value gap checks pass.

This starter is not connected to MT5 or Telegram and cannot place trades. Treat it as a development foundation, not trading software.

## Setup
Requires Node.js 20+.

```bash
npm install
npm test
npm run typecheck
```

## Planned implementation stages
1. Web dashboard and authentication.
2. Multi-user account configuration and secure secret storage.
3. Market data ingestion and strategy signal engine.
4. Server-side risk guard and trade journal.
5. Dual approval workflow (in-app + Telegram).
6. MT5 demo adapter with a hard demo-only gate.
7. End-to-end tests and operational monitoring.

## Fail-closed rules
If account mode, price, stop loss, position count, daily P/L, or either approval cannot be verified, reject the order request. Re-check exposure and daily loss immediately before any future execution adapter submits an order.
