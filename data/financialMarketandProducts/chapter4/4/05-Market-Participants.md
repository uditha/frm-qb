# 5️⃣ Market Participants (Section 4.5)

Three main types of trader:

1. 🛡️ **Hedgers** — reduce/eliminate risk
2. 🎲 **Speculators** — take risk (bet on direction)
3. ⚖️ **Arbitrageurs** — exploit inconsistent pricing

---

## 🛡️ Hedgers

> Use derivatives to **reduce or eliminate risk exposure**.

- Forwards on FX → manage **foreign exchange risk** (see file 03).
- **Options** can also hedge currency risk.
- 🔑 Unlike forwards, options give **downside protection** while **preserving upside potential**.

### Example 1 — Treasurer must PAY €1m in 6 months
**Fear:** euro gets more expensive.
**Hedge:** **buy a European CALL** on €1m, strike **USD 1.1950**.

- Rate **> 1.1950** → **exercise**, buy €1m at **1.1950** ✅ (capped cost)
- Rate **< 1.1950** → **don't exercise**, buy euros at the **cheaper market rate** ✅

### Example 2 — Treasurer will RECEIVE €1m in 6 months
**Fear:** euro gets cheaper.
**Hedge:** **buy a European PUT** on €1m, strike **USD 1.1950**.

- Rate **< 1.1950** → **exercise**, sell for **USD 1.195 million** ✅ (floor)
- Rate **> 1.1950** → **don't exercise**, sell at the **better market rate** ✅

### 🔑 Forward hedge vs Option hedge
- **Forward = locks in** the price for the future transaction.
- **Option = insurance** against adverse moves.
- Forward costs **nothing** (except bid-ask spread).
- Option costs a **premium** — e.g. the call/put on €1m at 1.1950 **might cost USD 40,000**.

### Reducing the premium
- **Call:** **raise** the strike → cheaper, but **less protection**
- **Put:** **lower** the strike → cheaper, but **less protection**

> ⚖️ Trade-off: **cheaper premium = weaker protection**

---

## 🎲 Speculators

> Derivatives let you take risk with a **small upfront payment** → same effect as **leverage**.

### Example — stock at USD 40, trader is bullish (3 months)
- 3-month call, strike **USD 42**, price **USD 2**
- Budget: **USD 4,000**

**Strategy A — Buy shares:** 100 shares × $40
**Strategy B — Buy options:** 2,000 options × $2

### If price = USD 45
- **Shares:** (45 − 40) × 100 = **+USD 500**
- **Options:** 2,000 × (45 − 42) = 6,000 − 4,000 cost = **+USD 2,000**
- (Discounting ignored)

### Table 4.5 — Profits (USD)

| Price in 3m | Shares | Options |
|---|---|---|
| 30 | −1,000 | −4,000 |
| 35 | −500 | −4,000 |
| 40 | 0 | −4,000 |
| 45 | +500 | +2,000 |
| 50 | +1,000 | +12,000 |

### Key points
- At $45 options are **4×** as profitable; at $50 **12×** as profitable.
- If price **≤ $42** → options **not exercised** → **lose entire USD 4,000** premium.
- Shares: no premium; profit/loss = **price change only**.
- **Option breakeven** vs zero: S_T = 42 + 2 = **$44**.
- **Options magnify gains AND losses** (leverage).

---

## ⚖️ Arbitrageurs

> **Arbitrage** = taking advantage of **inconsistent pricing** across two or more markets.

### Example
- Asset (pays **no income**) spot = **USD 50**
- Borrowing rate = **3%**
- 1-year forward price = **USD 52**

### Steps
1. **Borrow USD 50m** for 1 year at 3% → buy **1m units** at $50.
2. **Enter a forward to SELL** 1m units at **$52** in 1 year.
3. In 1 year: **repay loan** = 50,000,000 × 1.03 = **USD 51,500,000**; **sell** units for **USD 52,000,000**.

### Profit
52,000,000 − 51,500,000 = **USD 500,000** risk-free 💰

### Why arbitrage is temporary
- Fair forward here = 50 × 1.03 = **$51.50**; quoted **$52** is too high.
- Arbitrageurs **buying spot** (pushes spot ↑) and **selling forward** (pushes forward ↓) close the gap.
- → Opportunities **disappear quickly** once exploited.
