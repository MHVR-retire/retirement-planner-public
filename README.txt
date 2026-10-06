V3.8.1: Public application code is unchanged from V3.7.9; the tax-indexing correction is in the private calculation engine.

Retirement Planner V2.0 - Public Front End

Upload these files to the public GitHub repository:
- index.html
- styles.css
- client.js

This public package contains the user interface, charts, JSON save/load, and advertising layout.
It does not contain the private retirement projection formulas.

After deploying the private Render server:
1. Open client.js.
2. Find:
   const API_BASE_URL = "";
3. Replace it with your Render URL, for example:
   const API_BASE_URL = "https://your-render-service-name.onrender.com";
4. Commit that change to GitHub.

Do not put private/calculator-private.html, server.js, or package.json in the public repository.

Economic events update
- Adds up to five temporary economic events.
- Each event is tied to Person 1 or Person 2 reaching a selected age.
- Duration is selected in months.
- Event market return and inflation override normal assumptions during the event.
- Later-numbered events take priority if events overlap.

Economic events stability fix:
- Restores the normal pre- and post-retirement return assumptions when no event is active.
- Prevents older API responses from overwriting newer calculations after an event is removed or changed.


Update: Lump sum available balances are returned by the private server. Removals above the available account balance are rejected with an inline warning.


Update: Added Use / Ignore controls for income adjustments, lump sums, and economic events.

V3.6 Monthly Calculation Engine
- Projection engine evaluates retirement status, contributions, investment returns, income, withdrawals, lump sums, economic events and home transactions month by month.
- Investment-at-retirement values are captured at the exact selected retirement month.
- Projection reporting shows a Current period, then the exact first Retirement month, then annual periods anchored from that retirement month.

V3.6.1 fixes:
- Restored Spend surplus vs Save surplus sensitivity scenarios.
- Hardened Lump Sum 5 UI recalculation and verified private monthly engine processes slot 5.

V3.6.2 updates:
- Age at death is selected by year only and occurs at the start of that age year.
- Projection reporting shows Current, exact Retirement, then whole-age-year rows (Age 64, Age 65, etc.).
- Monthly calculation engine remains unchanged in granularity; only reporting boundaries are simplified.

V3.7 updates:
- Restored Income Adjustments count/status badge in the Retirement Projection header.
- Added Funding Ratio Income Solver using the full monthly calculation engine.
- Solver returns annual/monthly supported income before and after estimated tax.
- Added Apply button to use the solved pre-tax amount as Desired Income.

V3.7.1 updates:
- Target income summary annualizes the first retirement period and represents the household target.
- Expanded Income Adjustments from 5 to 7.
- Expanded Lump Sum additions/removals from 5 to 7.
- iPhone/Safari JSON export keeps the Blob URL alive long enough for the Files/Downloads save to complete.

V3.7.2
- Added Export Projection CSV and Export Summary CSV for calculation auditing.

V3.7.5 public update:
- After-tax chart bars use the server-provided effective deduction rates including estimated CPP/EI on employment income.
- Funding ratio uses the same before-tax-equivalent basis in both chart tax views.
- Projection CSV now includes before-tax/after-tax targets, actual after-tax income, income tax, CPP, EI, and effective deduction rates for audit.


V3.7.6 display update:
- After-tax chart tooltip and household projection table use the server-calculated actual after-tax total.
- TFSA/non-registered/surplus withdrawals remain tax-free in after-tax chart display.

V3.7.8 funding-ratio reconciliation:
- Funding ratio now uses the same projection-row income values exported to Projection CSV.
- Pre-tax desired-income mode compares pre-tax target with total pre-tax income, including employment income.
- After-tax desired-income mode compares after-tax target with actual after-tax household income.
- Final savings use the same final RRSP/RRIF, TFSA, non-registered, and surplus/GIC balances shown/exported by the projection.
- Chart tax-view toggle is display-only.
- Browser cache key bumped to client.js?v=3.7.8.


V3.8.1 changes: life-insurance death benefits; survivor lifestyle funding before survivor retirement; death-age selectors start at 68.


V3.8.1 changes: life-insurance benefits remain fixed exact-dollar amounts with no inflation adjustment; simplified P2 survivor CPP is 37.5% of P1 CPP while P2 is under 65 and 60% from age 65 onward, payable immediately after P1 death.
