# 4️⃣ Options (Section 4.4)

> An **option** gives the holder the **right (but not the obligation)** to **buy or sell** an asset at a **predetermined price** in the future.

- Trade on **exchanges AND OTC**.

---

## 🔤 Key terms

- **Call option:** long party has the right to **BUY** from the short party at the **strike price**. If exercised, the short party **must sell**.
- **Put option:** long party has the right to **SELL** to the short party at the **strike price**. If exercised, the short party **must buy**.
- **Strike price / exercise price (K):** the agreed price.
- **Expiration date / maturity date (T):** date in the contract.
- **European option:** exercise **only at expiration**.
- **American option:** exercise **any time up to expiration**.
- **Premium:** price paid **upfront** for an option.
  - ⚠️ A **forward costs nothing** to enter; an **option has a premium**.

> 🧠 **Memory trick:** **C**all = **C**laim to buy · **P**ut = **P**ush it away (sell)

---

## 📋 IBM option quotes — CBOE, 11 June 2018

- Exchange-traded stock options are **American**.
- IBM stock: **bid 147.03 / ask 147.04**.
- Expiries = **third Friday** of the month (coincidentally the **21st** for each month shown).
- Exchanges also have **weeklys** and **quarterlys** expiring at other times.

### Table 4.3 — CALL premiums (bid / ask)

**Sep 21, 2018**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 9.70 | 9.80 |
| 145 | 6.35 | 6.45 |
| 150 | 3.80 | 3.90 |
| 155 | 2.14 | 2.18 |

**Dec 21, 2018**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 11.45 | 11.65 |
| 145 | 8.40 | 8.55 |
| 150 | 5.90 | 6.05 |
| 155 | 4.00 | 4.10 |

**Jun 21, 2019**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 14.20 | 14.45 |
| 145 | 11.45 | 11.65 |
| 150 | 9.05 | 9.25 |
| 155 | 7.00 | 7.25 |

### Table 4.4 — PUT premiums (bid / ask)

**Sep 21, 2018**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 2.76 | 2.81 |
| 145 | 4.50 | 4.65 |
| 150 | 7.10 | 7.25 |
| 155 | 10.55 | 10.65 |

**Dec 21, 2018**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 5.00 | 5.15 |
| 145 | 7.05 | 7.15 |
| 150 | 9.65 | 9.80 |
| 155 | 12.75 | 12.95 |

**Jun 21, 2019**
| Strike | Bid | Ask |
|---|---|---|
| 140 | 8.65 | 8.90 |
| 145 | 10.85 | 11.10 |
| 150 | 13.45 | 13.70 |
| 155 | 16.40 | 16.70 |

### 🔍 Patterns to remember
1. **Calls get cheaper as strike ↑** (right to buy at a higher price is worth less).
2. **Puts get dearer as strike ↑** (right to sell at a higher price is worth more).
3. **Longer maturity → higher price** (for both calls and puts).
4. **Bid-ask spreads** (as % of price) are **much higher for options** than for the stocks themselves.

---

## 📐 The 4 option payoffs (European, per unit)

### 1. Long call (bought a call) — Fig 4.4
- S_T > K → exercise: pay K for asset worth S_T → **S_T − K**
- S_T ≤ K → don't exercise → **0**
- **Payoff = max(S_T − K, 0)**
```
Payoff
  |          /
  |        /
  |______/
  +------K------ S_T
```

### 2. Short call (sold a call) — Fig 4.5
- S_T > K → must sell asset worth S_T for K
- **Payoff = −max(S_T − K, 0)**
```
  +------K------ S_T
  |‾‾‾‾‾‾\
  |        \
  |          \
Payoff
```

### 3. Long put (bought a put) — Fig 4.6
- S_T < K → exercise: sell asset worth S_T for K → **K − S_T**
- S_T ≥ K → don't exercise → **0**
- **Payoff = max(K − S_T, 0)**
```
Payoff
  |\
  |  \
  |    \______
  +------K------ S_T
```

### 4. Short put (sold a put) — Fig 4.7
- S_T < K → must buy asset worth S_T for K
- **Payoff = −max(K − S_T, 0)**
```
  +------K------ S_T
  |    /‾‾‾‾‾‾
  |  /
  |/
Payoff
```

### Summary table

| Position | Payoff | Max gain | Max loss |
|---|---|---|---|
| Long call | max(S_T−K, 0) | Unlimited | Premium |
| Short call | −max(S_T−K, 0) | Premium | Unlimited |
| Long put | max(K−S_T, 0) | K − premium | Premium |
| Short put | −max(K−S_T, 0) | Premium | K − premium |

*(Payoff ignores premium; **profit = payoff − premium paid** for longs, **+ premium received** for shorts.)*

---

## ⚙️ Two consequences of non-linearity

Options are **more complex** than forwards/futures:

1. Option **value is a non-linear function** of the underlying's value.
2. Option **value depends on the volatility** of the underlying.

*(Valuation & hedging covered in the **Valuation and Risk Models** book.)*

---

## 🆚 Forwards vs Options

| | Forward/Future | Option |
|---|---|---|
| Holder's position | **Obligation** | **Right** |
| Upfront cost | **None** (except bid-ask) | **Premium** |
| Payoff | Linear | Non-linear |
| Hedging effect | **Locks in** a price | **Protection** against adverse moves, keeps upside |
| Depends on volatility? | No (payoff) | Yes (value) |
