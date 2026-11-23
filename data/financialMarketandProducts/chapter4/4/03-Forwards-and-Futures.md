# 3️⃣ Forwards & Futures (Sections 4.2–4.3)

---

## 📄 Forward Contract — definition

> An **OTC** contract where one party agrees to **buy** an asset for a **predetermined price** at a **future time**, and the other agrees to **sell** it at that price/time.

- Contrast with a **spot contract** = buy/sell **almost immediately** (settlement may take a **day or two**).

### Terminology
- **Long forward position** = agreed to **buy**
- **Short forward position** = agreed to **sell**
- **Forward price** = the specified price in the contract (how it's determined → later chapters)
- **Delivery price (K)** = forward price **when the contract was initiated**
  - ⚠️ K is *not necessarily* the forward price for that contract at **later** times.

---

## 💱 FX forwards (very popular)

- **Company A** will **receive** foreign currency later → **sell** it forward (short) to lock in the rate.
- **Company B** will **pay** foreign currency later → **buy** it forward (long) to lock in the rate.

### Table 4.2 — USD per EUR quotes (8 June 2018)

| | Bid | Ask |
|---|---|---|
| Spot | 1.1768 | 1.1771 |
| 1-month | 1.1802 | 1.1805 |
| 3-month | 1.1858 | 1.1862 |
| 6-month | 1.1944 | 1.1948 |

- **Bid** = price at which the **dealer buys**
- **Ask** = price at which the **dealer sells**
- E.g. spot: dealer pays **1.1768**, sells at **1.1771**.
- 1-month: dealer commits to pay **1.1802** / sell at **1.1805** in one month.
- 📌 **Forward prices ≠ spot prices** (calculation explained in a later chapter).

> 💡 **You buy at the dealer's ASK, sell at the dealer's BID.**

---

## 🧮 Worked example — 6-month EUR forwards

**Company A — LONG** €1m in 6 months → pays the **ask = 1.1948**
**Company B — SHORT** €1m in 6 months → receives the **bid = 1.1944**

Suppose the rate in 6 months is **USD 1.2500**:

**Company A payoff**
1,000,000 × (1.2500 − 1.1948)
= **+USD 55,200** ✅

**Company B payoff**
1,000,000 × (1.1944 − 1.2500)
= **−USD 55,600** ❌

---

## 📐 Forward payoff formulas (per unit)

- **S_T** = asset price at maturity
- **K** = delivery price

| Position | Payoff |
|---|---|
| **Long forward** | **S_T − K** |
| **Short forward** | **K − S_T** |

Both are **linear** → forwards are **linear derivatives**.

### Figure 4.2 — Long forward
```
Payoff
  |        /
  |      /
--+----K------ S_T
  |  /
  |/
```
Slope **+1**; zero at S_T = K.

### Figure 4.3 — Short forward
```
Payoff
  |\
  |  \
--+----K------ S_T
  |      \
  |        \
```
Slope **−1**; zero at S_T = K.

- Unlimited gain/loss in both directions (bounded only by price ≥ 0).
- **Zero-sum:** long's gain = short's loss.

---

## 🏦 Futures Contracts (4.3)

> Similar payoff to a forward, **but traded on an exchange**.

- The **exchange defines the asset** and **specifies the maturity dates** that can be traded.
- Exchange organises trading so there is **very little credit risk** (risk the agreement won't be honoured) — even though parties may **not know each other**.

### Forwards vs futures — underlyings
- **Forwards:** most active on a **small number** of underlyings (e.g. **exchange rates, interest rates**).
- **Futures:** trade on a **wide range**, including:
  - 🌽 **Agricultural:** corn, wheat, live cattle
  - 🥇 **Metals:** gold, silver, copper, platinum
  - 📈 **Equity indices:** S&P 500, NASDAQ 100
  - ⛽ **Energy:** oil, natural gas, electricity
  - 🏠 **Real estate indices**
  - 🌡️ **Temperatures** in particular cities
  - ₿ **Cryptocurrencies** e.g. bitcoin

### 🆚 Forward vs Future

| | Forward | Future |
|---|---|---|
| Where | OTC | Exchange |
| Terms | Negotiated | Standardised by exchange |
| Credit risk | Counterparty risk | Very little |
| Underlyings | Narrow (FX, rates) | Wide range |
| Payoff | S_T − K (long) | Similar |
| Cost to enter | Nothing (except bid-ask) | — |
