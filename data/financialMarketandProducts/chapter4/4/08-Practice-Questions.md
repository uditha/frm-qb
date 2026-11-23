# 8️⃣ Practice Questions & Answers

*Not actual FRM exam questions — for understanding.*
Tip: cover the answer, try first! 🙈

---

## 🟢 Short Concept Questions

### Q4.1 — Linear vs non-linear derivative? Example of each.
**A:** Linear: payoff **linearly dependent** on underlying (e.g. **forward**). Non-linear: payoff is a **non-linear function** of underlying (e.g. **option**).

### Q4.2 — Long vs short forward position?
**A:** Long = agreed to **buy** at a set price at a future time. Short = agreed to **sell** at a set price at a future time.

### Q4.3 — Two main markets for derivatives?
**A:** **Exchanges** and **OTC** markets.

### Q4.4 — Ratio of OTC size to exchange size in 2017: (a) 2 (b) 4 (c) 7 (d) 16?
**A:** **(c) 7.** (Book's answer text says "about eight times"; from Table 4.1, 531.9/81.0 ≈ 6.6 → closest option is 7.)

### Q4.5 — Which trade on exchanges: (a) forwards (b) futures (c) options?
**A:** **Futures and options.** (Options also trade OTC.)

### Q4.6 — Payoff of a long call?
**A:** **max(S_T − K, 0)**

### Q4.7 — Payoff of a short put?
**A:** **−max(K − S_T, 0)**

### Q4.8 — Three types of traders?
**A:** **Hedgers, speculators, arbitrageurs.**

### Q4.9 — How did Kerviel and Leeson lose billions with a hedging/arbitrage mandate?
**A:** They **switched to speculating** without anyone realising.

### Q4.10 — "Options provide leverage." Explain.
**A:** Buying a call is like **borrowing to buy the asset** — big risks with a **small initial investment**; gains and losses are **accentuated**.

---

## 🔵 Practice Questions

### Q4.11 — Short futures to sell 100 units at USD 50. Gain/loss if price at maturity is (a) 55, (b) 48?
**A:**
- (a) **Loss** 100 × (55 − 50) = **USD 500**
- (b) **Gain** 100 × (50 − 48) = **USD 200**

### Q4.12 — Advantage of OTC over exchange for a treasurer hedging FX?
**A:** No need for **standard exchange features** — **maturity date** and (for options) **strike** can be **negotiated** to fit precise needs.

### Q4.13 — Selling a call vs buying a put?
**A:**
- **Sell call:** you **must sell** the asset when its price **> strike** (obligation).
- **Buy put:** you **have the option to sell** when price **< strike** (right).

### Q4.14 — Buy call, K = 50, stock = 49, cost = 2. When is there a profit?
**A:** Payoff max(S_T − 50, 0) > 2 → **S_T > 52**

### Q4.15 — Sell put, K = 50, stock = 51, price = 3. When is there a profit?
**A:** Payoff to buyer max(50 − S_T, 0) < 3 → **S_T > 47**
*(Book writes "50 − S_T > 3 or S_T < 47" — that's when the **buyer** profits; the **seller** profits when S_T > 47.)*

### Q4.16 — Why does compression reduce OTC size as measured by BIS?
**A:** Compression **reorganises trades** so **underlying principal is reduced**; BIS measures **total outstanding principal**.

### Q4.17 — Short forward + long call (strike = forward price). Payoff?
**A:** K − S_T + max(S_T − K, 0) = **max(0, K − S_T)** → a **long put**.

| | S_T > K | S_T < K |
|---|---|---|
| Long call | S_T − K | 0 |
| Short fwd | K − S_T | K − S_T |
| **Net** | **0** | **K − S_T** |

### Q4.18 — Short forward + short put (strike = forward price). Payoff?
**A:** K − S_T − max(K − S_T, 0) = **−max(0, S_T − K)** → a **short call**. Same as **min(K − S_T, 0)**.

| | S_T > K | S_T < K |
|---|---|---|
| Short put | 0 | −(K − S_T) |
| Short fwd | K − S_T | K − S_T |
| **Net** | **K − S_T** | **0** |

(When S_T > K the short forward is **losing**.)

### Q4.19 — Stock at USD 70. Buy 100 shares, or calls on 1,000 shares (USD 7 each, K = 70, 6 months)? Explain the difference.
**A:** Both cost **USD 7,000**. The **option strategy is much riskier**:

| Price | Shares | Options |
|---|---|---|
| 50 | −2,000 | −7,000 |
| 55 | −1,500 | −7,000 |
| 60 | −1,000 | −7,000 |
| 65 | −500 | −7,000 |
| 70 | 0 | −7,000 |
| 75 | +500 | −2,000 |
| 80 | +1,000 | +3,000 |
| 85 | +1,500 | +8,000 |
| 90 | +2,000 | +13,000 |

### Q4.20 — Breakeven price where both strategies in Q4.19 give the same result?
**A:**
100(S_T − 70) = 1,000(S_T − 70) − 7,000
→ 900 S_T = 70,000
→ **S_T = USD 77.78**
