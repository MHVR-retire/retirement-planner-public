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
