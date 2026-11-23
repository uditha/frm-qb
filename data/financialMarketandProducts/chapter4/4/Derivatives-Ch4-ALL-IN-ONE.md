# 📘 Chapter 4 — Introduction to Derivatives

*FRM Part I · Financial Markets & Products*

---

## 📂 Files in this set

1. **01-What-Are-Derivatives.md**
   Definition, linear vs non-linear, uses, history, 2007–08 crisis
2. **02-The-Markets.md**
   Exchange vs OTC, dealers, regulation, market size
3. **03-Forwards-and-Futures.md**
   Long/short, forward quotes, payoffs, futures underlyings
4. **04-Options.md**
   Calls/puts, European/American, IBM quotes, 4 payoff cases
5. **05-Market-Participants.md**
   Hedgers, speculators, arbitrageurs (all worked examples)
6. **06-Derivatives-Risks.md**
   Rogue traders, controls, chapter summary
7. **07-Formula-Cheat-Sheet.md**
   Every formula + quick-recall facts
8. **08-Practice-Questions.md**
   All 20 questions with full answers

---

## 🎯 Learning objectives

After this reading you should be able to:

- **Define** derivatives, describe their features and uses, and **compare** linear vs non-linear derivatives
- **Describe** the OTC market, distinguish it from exchange trading, and evaluate its pros/cons
- **Differentiate** options, forwards and futures
- **Identify & calculate** option and forward payoffs
- **Differentiate** hedgers, speculators and arbitrageurs
- **Calculate & compare** hedging payoffs (forwards vs options)
- **Calculate & compare** speculative payoffs (futures vs options)
- **Calculate** an arbitrage payoff and explain why arbitrage is temporary
- **Describe** risks from using derivatives

---

## ⚡ The chapter in 6 lines

- A **derivative** gets its value from an **underlying** (price, rate, index… almost anything observable).
- **Linear** = forwards/futures (payoff moves 1-for-1). **Non-linear** = options (payoff kinks at strike).
- Trade on **exchanges** (standardised, low credit risk) or **OTC** (customised, dealer-based).
- **Forward/future** = *obligation*, costs nothing to enter. **Option** = *right*, costs a **premium**.
- Users: **hedgers** (cut risk), **speculators** (take risk w/ leverage), **arbitrageurs** (exploit mispricing).
- Main danger: hedgers/arbitrageurs **secretly turning into speculators** → huge losses.


---

# 1️⃣ What Are Derivatives?

---

## 📌 Definition

> A **derivative** is a contract whose value **depends on (derives from)** the value of one or more financial variables.

- These variables are called **underlyings**.
- Typical underlyings: **equity prices, exchange rates, interest rates**.

---

## 📈 Linear vs Non-Linear

### Linear derivatives
- Payoff is **linearly related** to the underlying's value.
- **Example: forward contract** — agreement between two parties to buy/sell an asset at a **specified price** at a **future time**.
- Both its **value before maturity** and its **payoff at maturity** depend linearly on the underlying.

### Non-linear derivatives
- Payoff is a **non-linear function** of the underlying.
- **Example: option** — holder has the **right but NOT the obligation** to buy/sell an asset at a specified price at a future time.

### 🔑 Valuation point
- The **underlying's value** is central to valuing *both* types.
- **Other variables** also matter — e.g. **interest rates** and **volatilities**.

| | Linear | Non-linear |
|---|---|---|
| Example | Forward, future | Option |
| Commitment | Obligation | Right only |
| Payoff shape | Straight line | Kinked ("hockey stick") |

---

## 🕰️ Brief history

- **Before money:** goods sometimes exchanged for crops to be harvested in the future (an early derivative).
- **19th century:** **Chicago Board of Trade (CBOT)** set up to facilitate agreements to exchange commodities in the future.
- **Today:** trade on **exchanges** and **OTC**; both have seen **unprecedented growth**.

---

## 🛠️ How derivatives are used (4 + 1 examples)

1. **Companies** manage **interest rate risk, FX risk, commodity price risk**, etc.
2. **Added to corporate bonds:**
   - Issuer may get the right to **repay early** (callable)
   - Holder may get the right to **demand early repayment** (puttable)
   - Holder may get the right to **convert to equity** (convertible)
3. **Employee compensation:** options to **buy company shares** at a future time for a **predetermined price**.
4. **Capital investment — "real options":**
   - E.g. right to **abandon** a project if it goes badly, or **expand** if it goes well.
   - Called *real* options because they involve **physical assets** (not financial).
   - Now **common practice** to consider real options when valuing capital investments.
5. **Homeowners' mortgages:** embedded option to **repay early and refinance** at a lower rate (covered in Ch. 18).

---

## 🌦️ Unusual underlyings

Almost **any observable variable** can be an underlying:

- Price of **hogs**
- Price of **electricity** in a region
- **Snowfall** at a ski resort
- **Temperature** at a weather station
- **Earthquake damage claims** by an insurer's policyholders
- **Lifespan** of a representative group of **1,000 people**

---

## ⚖️ Hedging vs speculation

- **Have an exposure** → a derivatives trade that **reduces** it = **hedging**.
- **No exposure** → the **same trade** = **speculation**.
- ⚠️ Speculation can be **extremely risky**.

> 💡 The *same trade* can be a hedge or a speculation — it depends on what you already hold.

---

## 💥 Role in the 2007–2008 credit crisis

Step-by-step chain of events:

1. US banks **relaxed mortgage lending standards**.
2. → Huge number of **subprime mortgages** (loans to less creditworthy borrowers).
3. Banks **didn't keep** them on balance sheet — they **bundled them into portfolios** and created **complex derivatives** whose values depended on **mortgage default losses**.
4. Easy mortgages → **housing demand ↑** → **house prices ↑ sharply**.
5. Many subprime borrowers **couldn't afford** payments (made worse by **rising mortgage rates**) → **defaults & foreclosures ↑**.
6. → **Supply of houses for sale ↑** → **house prices ↓**.
7. → **Negative equity** (mortgage owed > house value).
8. Some homeowners with negative equity **defaulted even though they could pay** → prices fell further.
9. → **Losses** on mortgage-based derivatives; investors worldwide (temporarily) **lost appetite for any risky debt**.
10. → **Worst recession in 75 years**.

---

## ✅ Benefits to society

Derivatives let risk be **transferred** in ways that **benefit both sides**:

- **Corporate treasurers** manage FX, interest rate and commodity risk in ways otherwise **not possible**.
- **Fund managers** can **diversify** exposures.
- **Ski slope operators** avoid going **out of business** after one unseasonably **warm winter**.

### 🏛️ Regulator's challenge
Keep the benefits while **discouraging extreme speculation** — i.e. **huge risks** or **unnecessarily complex instruments**.


---

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


---

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


---

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


---

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


---

# 6️⃣ Derivatives Risks (Section 4.6) & Summary

---

## ⚠️ The core problem

- Attracting **many kinds of traders** is a **strength** and a major reason for derivatives' success.
- But **leverage** makes it **very easy to take significant risks**.
- **Rewards** from successful speculation are **very high** → traders are **tempted to speculate** even when their **mandate** is to **hedge** or **find arbitrage**.
- Without **controls**, they may **speculate without anyone in the organisation knowing**.

### The doubling-down spiral 🌀
1. Speculating trader **loses money**
2. Takes **larger, riskier** positions to win it back
3. Gains **don't materialise**
4. Increases risk **again and again**
5. → Losses reach **catastrophic** levels

---

## 🚨 Rogue trader examples (memorise!)

| Trader | Bank | Loss | How |
|---|---|---|---|
| **John Rusnak** | Allied Irish Bank | **USD 700m** | FX trading; hid losses with **fictitious option trades** |
| **Nick Leeson** | Barings Bank | **~USD 1bn** | Unauthorised big bets on **Nikkei index**; hid losses from superiors |
| **Jérôme Kerviel** | Société Générale | **~USD 7bn** | Speculated on **equity indices** while appearing to be an **arbitrageur** |
| **Kweku Adoboli** | UBS | **~USD 2.3bn** | Unauthorised speculative positions in **stock market indices** |

> 💡 Common thread: mandate was **hedging/arbitrage**, but they **became speculators without anyone realising**.

---

## 📝 Chapter Summary

- Derivatives trade on **exchanges** and **OTC** markets (more detail in next 2 chapters).
- **Forwards:** OTC agreements to trade an asset at a set price on a future date → **lock in** a price.
- **Futures:** like forwards but **exchange-traded**.
- **Options:** trade on **exchanges and OTC**.
  - Forwards/futures **commit** you to buy/sell.
  - Options give the **right, not obligation**.
  - Options buy **protection** against unfavourable moves while keeping the **benefit of favourable** ones.
- Derivatives are **versatile** — hedging, speculation, arbitrage. A **strength**, but also a **risk**.
- For many traders, speculation is **more fun (and potentially more rewarding)** than hedging.
- Without **good controls** → danger of **unauthorised speculation** with **disastrous results**.


---

# 7️⃣ Formula & Fact Cheat Sheet

**Notation:** S_T = asset price at maturity · K = strike / delivery price · c, p = call/put premium

---

## 📐 Payoffs (per unit)

| Position | Payoff |
|---|---|
| Long forward | S_T − K |
| Short forward | K − S_T |
| Long call | max(S_T − K, 0) |
| Short call | −max(S_T − K, 0) |
| Long put | max(K − S_T, 0) |
| Short put | −max(K − S_T, 0) |

## 💵 Profit (ignoring discounting)

- Long call: max(S_T − K, 0) − c
- Short call: c − max(S_T − K, 0)
- Long put: max(K − S_T, 0) − p
- Short put: p − max(K − S_T, 0)

## 🎯 Breakevens

- Long/short **call**: S_T = **K + c**
- Long/short **put**: S_T = **K − p**

## 🔗 Combination identities (Q4.17–4.18)

*(Option strike = forward price K)*

- Short forward + **long call** = **long put**
  (K − S_T) + max(S_T − K, 0) = **max(K − S_T, 0)**
- Short forward + **short put** = **short call**
  (K − S_T) − max(K − S_T, 0) = **−max(S_T − K, 0)** = min(K − S_T, 0)

## 🧮 Contract payoff
Payoff = **Number of units × per-unit payoff**

## ⚖️ Arbitrage (no-income asset)
- Fair forward ≈ **S₀ × (1 + r)** (simple annual)
- If quoted F > S₀(1+r): **borrow, buy spot, sell forward**
- Profit = F − S₀(1+r) per unit

## 📈 Speculation breakeven (shares vs options, same budget)
Set N_shares × (S_T − S₀) = N_options × (S_T − K) − Cost
→ solve for S_T *(e.g. Q4.20 → $77.78)*

---

## 🧠 Quick-recall facts

- **Linear** = forwards, futures · **Non-linear** = options
- Option **value** depends on **volatility**
- **European** = exercise at expiry only · **American** = any time
- **Exchange-traded stock options** are **American**
- **Forward**: no cost to enter · **Option**: premium
- Buy at dealer's **ask**, sell at dealer's **bid**
- **Calls ↓** as strike ↑ · **Puts ↑** as strike ↑ · Both **↑ with maturity**
- **CBOT** founded **1848** · **CBOE** **1973** (calls only; puts from **1977**)
- **Black-Scholes-Merton** published **1973**
- **Flash crash 2010**: −7% in 15 min
- **BIS** data from **1998**
- 2017: Exchange **USD 81tn**, OTC **USD 532tn**, GDP **~USD 75tn**
- 1998→2017 growth: OTC **×7.4**, exchange **×6**
- OTC ≈ **7× GDP**; exchange ≈ **1× GDP**
- OTC shrank 2014–17 due to **compression**
- Post-crisis OTC rules: **SEFs**, **CCPs**, **trade reporting**
- OTC participants: **end users** & **dealers**; **interdealer brokers** keep anonymity
- Three trader types: **hedgers, speculators, arbitrageurs**
- Rogue traders: **Rusnak $700m · Leeson ~$1bn · Kerviel ~$7bn · Adoboli ~$2.3bn**


---

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


---

