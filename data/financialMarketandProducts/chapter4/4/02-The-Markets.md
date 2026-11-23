# 2️⃣ The Markets (Section 4.1)

Derivatives trade in **two** kinds of market:

- **Exchange:** investors trade **standardised contracts defined by the exchange**.
- **Over-the-counter (OTC):** participants **contact each other directly** (or via a **broker**) to trade.

*(Chapters 5 & 6 go into more detail.)*

---

## 🏛️ Exchange-Traded Markets

### Key dates
- **1848** — **CBOT** established so **farmers could trade with merchants**.
- Within a few years — **"to-arrive" contracts** traded (forerunner of **futures**).
- Now there are **futures exchanges worldwide**.
- **1973** — CBOT launched the **Chicago Board Options Exchange (CBOE)**.
  - At first **only call options**; **puts not traded until 1977**.
  - CBOE set **well-defined contracts** + a mechanism to **minimise default losses**.
  - Today one of **many** exchanges trading options on **stocks and stock indices**.
- **1973** — **Black-Scholes-Merton** option valuation model published.
  - Soon after, **special-purpose calculators** were used by options traders.
  - Papers: Black & Scholes, *J. Political Economy* (1973); Merton, *Bell J. Econ. & Mgmt Science* (1973).

### Trading methods
- **Open-outcry (traditional):** traders on the **exchange floor** use **hand signals and shouting**.
  - *Tall traders* may have had an advantage (easier to get attention) 😄
- **Electronic (now most trading):** computers **match buyers and sellers**.
  - Sometimes initiated by **algorithms with no human** involvement.
  - ⚠️ **2010 Flash Crash:** markets fell **~7% in 15 minutes** then rebounded — partly due to **unintended consequences of a trading algorithm**.

---

## 🤝 Over-the-Counter (OTC) Markets

### Main advantage
Contracts **don't have to be standard** — participants can trade **any contract they like**.

### Two types of participant

**End users**
- **Corporations, fund managers, other financial institutions**
- Use derivatives to **manage risks** or **acquire specific exposures**

**Dealers**
- **Large financial institutions**
- Give **bid and ask quotes** for commonly traded derivatives
- Give **one-sided quotes** for **highly structured** derivatives on request
- **Offset** risks from end-user trades by trading with other dealers → the **interdealer market**

### Interdealer brokers
- End users usually contact **dealers directly**.
- Dealers often use **interdealer brokers** to trade with other dealers.
- **Advantage:** a dealer **doesn't reveal its desired trades** to other dealers.
- Broker **doesn't reveal client's name until trade is finalised**.
- **Why it matters:** if others know a dealer must dump a big exposure, they may **trade ahead** of it (moving the price). A good broker feeds trades in **anonymously**.

---

## 📜 Post-crisis OTC regulation

**Before 2007–08:** OTC market was **largely unregulated**.

**After the crisis — examples of new rules:**

1. 🇺🇸 **Swap Execution Facilities (SEFs):** standardised OTC derivatives between dealers must (whenever possible) trade on SEFs — **exchange-like platforms** where participants **post bid/ask prices**.
2. **Central Counterparty (CCP):** must be used for **standardised transactions between dealers**.
3. **Central registry:** **all trades must be reported**. (Previously OTC trades were **private**, with **no reporting**.)

---

## 📊 Market Size

- **Bank for International Settlements (BIS)** began collecting data in **1998**.

### ⚠️ What the numbers measure (NOT transaction value!)
- **Exchange-traded:** **value of assets underlying** outstanding contracts.
  - E.g. option to buy **100 shares** worth **USD 40** at strike **USD 45** → recorded as **USD 4,000** (=100 × 40).
- **OTC:** **total principal underlying** outstanding transactions.
  - E.g. forward to buy **£1m** at **USD 1.2500** → recorded at **current value of £1m**, *not* the forward's value (which may be only a few thousand dollars).

### Table 4.1 — Underlying value (USD trillions)

| Date | Exchange | OTC |
|---|---|---|
| Jun 1998 | 13.3 | 72.1 |
| Jun 2017 | 81.0 | 531.9 |

### Key takeaways
- **OTC grew ×7.4**; **exchange grew ×6** (1998–2017).
- World **GDP 2017 ≈ USD 75 trillion**:
  - Exchange-traded underlying ≈ **1 × world GDP**
  - OTC underlying ≈ **7 × world GDP**
- **OTC ≈ 6.6–7× bigger** than exchange-traded in 2017 (531.9 / 81.0 ≈ 6.6).
- **Figure 4.1** charts both markets 1998–2017; OTC dwarfs exchange-traded throughout.

### 📉 Why OTC shrank 2014–2017: **Compression**
- Two or more participants **restructure transactions** so their **underlying principal is reduced**.
- → Less **capital required**.
- Since BIS measures **outstanding principal**, compression **reduces measured market size**.
- (Explained further in the next two chapters.)

---

## 🆚 Exchange vs OTC — quick compare

| Feature | Exchange | OTC |
|---|---|---|
| Contracts | Standardised | Customised |
| Counterparty | Via exchange | Direct / broker |
| Credit risk | Very low | Higher (CCP now for std. trades) |
| Size (2017) | ~USD 81tn | ~USD 532tn |
| Pre-2008 regulation | Regulated | Largely unregulated |
