/** Elastic Tree Workspace staff — full studio entitlements without PayU. */

export function employeeDomain(): string {
  return (process.env.ET_EMPLOYEE_DOMAIN || "elastictree.com").trim().toLowerCase();
}

/**
 * True for any mailbox on the company domain, e.g. name@elastictree.com.
 * Rejects lookalikes like name@elastictree.com.evil.com.
 */
export function isEtEmployeeEmail(email: string | null | undefined): boolean {
  const normalized = (email || "").trim().toLowerCase();
  const domain = employeeDomain();
  if (!normalized || !domain || !normalized.includes("@")) return false;
  const at = normalized.lastIndexOf("@");
  if (at <= 0 || at === normalized.length - 1) return false;
  return normalized.slice(at + 1) === domain;
}
