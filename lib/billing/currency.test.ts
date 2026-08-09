import { convertFromInr, displayMoney, getPricingCountry } from "./currency";

function assert(cond: unknown, msg: string) {
  if (!cond) throw new Error(msg);
}

const us = getPricingCountry("US");
const inr = getPricingCountry("IN");

const usd = convertFromInr(8350, us); // 8350 / 83.5 = 100 → *1.2 = 120
assert(Math.abs(usd - 120) < 0.01, `expected 120 got ${usd}`);

const india = convertFromInr(12000, inr);
assert(india === 12000, `India should not add markup, got ${india}`);

const money = displayMoney(4500, us);
assert(money.isInternational, "US should be international");
assert(money.primary.includes("120") || money.primary.includes("$"), money.primary);

console.log("currency tests ok");
