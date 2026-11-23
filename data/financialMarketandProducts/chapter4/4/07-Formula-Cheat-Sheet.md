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
