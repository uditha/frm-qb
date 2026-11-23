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
