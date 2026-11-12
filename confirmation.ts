export interface SetupChecks {
  liquiditySweep: boolean;
  marketStructureShift: boolean;
  displacement: boolean;
  fairValueGap: boolean;
}

/** A setup is eligible only when all four required conditions are confirmed. */
export function isConfirmedSetup(checks: SetupChecks): boolean {
  return checks.liquiditySweep &&
    checks.marketStructureShift &&
    checks.displacement &&
    checks.fairValueGap;
}
