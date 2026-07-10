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
