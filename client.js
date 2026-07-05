
  let incomeChart;
  let balanceChart;

  // Paste your private Render server URL here after deployment.
  // Example: const API_BASE_URL = "https://your-render-service-name.onrender.com";
  // Leave blank only if the front end and server are hosted on the same domain.
  const API_BASE_URL = "";


  const defaults = {
    householdMode: "couple",
    p1RetirementAge: 65,    p1CurrentAge: 35,    p1LifeExpectancy: 90,
    p1CurrentAgeMonth: 0,
    p1RetirementAgeMonth: 0,
    p1LifeExpectancyMonth: 0,    p1RRSPSavings: 100000,
    p1TFSASavings: 50000,
    p1RRIFConversionAge: 71,
    p1RRIFConversionAgeMonth: 0,
    p1NonRegisteredBalance: 0,
    p1RRSPContribution: 500,
    p1TFSAContribution: 500,
    p1CPPIncome: 12000,
    p1CPPStartAge: 65,
    p1CPPStartAgeMonth: 0,
    p1OASIncome: 9000,
    p1OASStartAge: 65,
    p1OASStartAgeMonth: 0,
    p1DBPension: 0,
    p1OtherIncome: 0,
    p1OtherStartAge: 65,
    p1OtherStartAgeMonth: 0,
    p1OtherEndAge: 105,
    p1OtherEndAgeMonth: 0,
    p1EmploymentIncome: 75000,
    p2RetirementAge: 65,
    p2RetirementAgeMonth: 0,
    p2CurrentAge: 35,
    p2CurrentAgeMonth: 0,
    p2LifeExpectancy: 92,
    p2LifeExpectancyMonth: 0,
    p2RRSPSavings: 100000,
    p2TFSASavings: 50000,
    p2RRIFConversionAge: 71,
    p2RRIFConversionAgeMonth: 0,
    p2NonRegisteredBalance: 0,
    p2RRSPContribution: 500,
    p2TFSAContribution: 500,
    p2CPPIncome: 12000,
    p2CPPStartAge: 65,
    p2CPPStartAgeMonth: 0,
    p2OASIncome: 9000,
    p2OASStartAge: 65,
    p2OASStartAgeMonth: 0,
    p2DBPension: 0,
    p2OtherIncome: 0,
    p2OtherStartAge: 65,
    p2OtherStartAgeMonth: 0,
    p2OtherEndAge: 105,
    p2OtherEndAgeMonth: 0,
    p2EmploymentIncome: 75000,
    desiredIncome: 9000,
    desiredIncomeFrequency: "monthly",
    incomeView: "beforeTax",
    survivorIncomeNeed: 80,
    chartFrequency: "monthly",
    chartTaxView: "beforeTax",
    dollarView: "constant",
    contributionFrequency: "monthly",
    province: "ON",
    returnRate: 5,
    postRetirementReturnRate: 4,
    inflationRate: 2,
    adjustment1Description: "",
    adjustment2Description: "",
    adjustment3Description: "",
    adjustment4Description: "",
    adjustment5Description: "",
    adjustment1Person: "none",
    adjustment1Age: 65,
    adjustment1AgeMonth: 0,
    adjustment1Direction: "increase",
    adjustment1Amount: 0,
    adjustment1Frequency: "monthly",
    adjustment2Person: "none",
    adjustment2Age: 65,
    adjustment2AgeMonth: 0,
    adjustment2Direction: "increase",
    adjustment2Amount: 0,
    adjustment2Frequency: "monthly",
    adjustment3Person: "none",
    adjustment3Age: 65,
    adjustment3AgeMonth: 0,
    adjustment3Direction: "increase",
    adjustment3Amount: 0,
    adjustment3Frequency: "monthly",
    adjustment4Person: "none",
    adjustment4Age: 65,
    adjustment4AgeMonth: 0,
    adjustment4Direction: "increase",
    adjustment4Amount: 0,
    adjustment4Frequency: "monthly",
    adjustment5Person: "none",
    adjustment5Age: 65,
    adjustment5AgeMonth: 0,
    adjustment5Direction: "increase",
    adjustment5Amount: 0,
    adjustment5Frequency: "monthly",
    homeCurrentValue: 0,
    homeGrowthRate: 3,
    sellHomeOption: "no",
    homeSaleType: "fullSale",
    newHomePrice: 0,
    homeSalePerson: "p1",
    homeSaleAge: 75,
    homeSaleAgeMonth: 0,
    lumpSum1Description: "",
    lumpSum1Type: "remove",
    lumpSum1Person: "none",
    lumpSum1Age: 65,
    lumpSum1AgeMonth: 0,
    lumpSum1Account: "rrsp",
    lumpSum1Amount: 0,
    lumpSum2Description: "",
    lumpSum2Type: "remove",
    lumpSum2Person: "none",
    lumpSum2Age: 65,
    lumpSum2AgeMonth: 0,
    lumpSum2Account: "rrsp",
    lumpSum2Amount: 0,
    lumpSum3Description: "",
    lumpSum3Type: "remove",
    lumpSum3Person: "none",
    lumpSum3Age: 65,
    lumpSum3AgeMonth: 0,
    lumpSum3Account: "rrsp",
    lumpSum3Amount: 0,
    lumpSum4Description: "",
    lumpSum4Type: "remove",
    lumpSum4Person: "none",
    lumpSum4Age: 65,
    lumpSum4AgeMonth: 0,
    lumpSum4Account: "rrsp",
    lumpSum4Amount: 0,
    lumpSum5Description: "",
    lumpSum5Type: "remove",
    lumpSum5Person: "none",
    lumpSum5Age: 65,
    lumpSum5AgeMonth: 0,
    lumpSum5Account: "rrsp",
    lumpSum5Amount: 0,
  };

  function isCoupleModeForDisplay() {
    return document.getElementById("householdMode").value === "couple";
  }


  function formatMoney(value) {
    return "$" + Number(value).toLocaleString("en-CA", { maximumFractionDigits: 0 });
  }

  function clampNumber(num, min = -100000000, max = 100000000) {
    if (!Number.isFinite(num)) return 0;
    return Math.min(max, Math.max(min, num));
  }

  function value(id) {
    const element = document.getElementById(id);
    if (!element) return 0;
    return clampNumber(Number(element.value));
  }

  function selected(id) {
    const element = document.getElementById(id);
    if (!element) return "";
    return String(element.value || "");
  }

  function sanitizeText(text, maxLength = 160) {
    return String(text || "")
      .replace(/[<>`]/g, "")
      .replace(/javascript:/gi, "")
      .slice(0, maxLength)
      .trim();
  }

  function escapeHtml(text) {
    return String(text || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function populateCurrency(id, start, end, step) {
    const select = document.getElementById(id);
    select.innerHTML = "";
    for (let amount = start; amount <= end; amount += step) {
      const option = document.createElement("option");
      option.value = amount;
      option.textContent = formatMoney(amount);
      select.appendChild(option);
    }
  }

  function populatePercent(id, start, end, step, selectedValue) {
    const select = document.getElementById(id);
    select.innerHTML = "";
    for (let amount = start; amount <= end + 0.001; amount += step) {
      const rounded = Math.round(amount * 10) / 10;
      const option = document.createElement("option");
      option.value = rounded;
      option.textContent = rounded.toFixed(step < 1 ? 1 : 0) + "%";
      if (rounded === selectedValue) option.selected = true;
      select.appendChild(option);
    }
  }

  function populateAge(id, start, end, selectedValue) {
    const select = document.getElementById(id);
    select.innerHTML = "";
    for (let age = start; age <= end; age++) {
      const option = document.createElement("option");
      option.value = age;
      option.textContent = age;
      if (age === selectedValue) option.selected = true;
      select.appendChild(option);
    }
  }


  function populateMonth(id, selectedValue = 0) {
    const select = document.getElementById(id);
    if (!select) return;
    select.innerHTML = "";
    for (let month = 0; month <= 11; month++) {
      const option = document.createElement("option");
      option.value = month;
      option.textContent = month + (month === 1 ? " month" : " months");
      if (month === selectedValue) option.selected = true;
      select.appendChild(option);
    }
  }

  function ageInTotalMonths(yearId, monthId) {
    const years = value(yearId);
    const monthElement = document.getElementById(monthId);
    const months = monthElement ? Number(monthElement.value) : 0;
    return (years * 12) + months;
  }

  function ageInYears(yearId, monthId) {
    return ageInTotalMonths(yearId, monthId) / 12;
  }

  function monthsToAgeYears(totalMonths) {
    return totalMonths / 12;
  }

  function formatAgeYearsMonths(age) {
    if (!Number.isFinite(age)) return "";
    let years = Math.floor(age);
    let months = Math.round((age - years) * 12);
    if (months >= 12) {
      years += 1;
      months = 0;
    }
    return months === 0 ? String(years) : years + "y " + months + "m";
  }



  function updateDesiredIncomeOptions() {
    const frequency = selected("desiredIncomeFrequency");
    const desiredIncomeSelect = document.getElementById("desiredIncome");
    const currentValue = desiredIncomeSelect ? Number(desiredIncomeSelect.value) : defaults.desiredIncome;

    if (frequency === "monthly") {
      populateCurrency("desiredIncome", 0, 20000, 50);
    } else {
      populateCurrency("desiredIncome", 0, 250000, 500);
    }

    if (desiredIncomeSelect) {
      const optionExists = Array.from(desiredIncomeSelect.options).some(option => Number(option.value) === currentValue);
      desiredIncomeSelect.value = optionExists ? currentValue : defaults.desiredIncome;
    }
  }



  function toggleHomeSaleFields() {
    const sellHome = selected("sellHomeOption") === "yes";
    const saleType = selected("homeSaleType");
    const saleTypeField = document.getElementById("homeSaleTypeField");
    const newHomePriceField = document.getElementById("newHomePriceField");

    if (saleTypeField) saleTypeField.classList.toggle("hidden", !sellHome);
    if (newHomePriceField) newHomePriceField.classList.toggle("hidden", !sellHome || saleType !== "downsize");
  }

  function setDefaults() {
    Object.entries(defaults).forEach(([id, val]) => {
      const el = document.getElementById(id);
      if (el) el.value = val;
    });
    updateDesiredIncomeOptions();
    togglePerson2();
    toggleHomeSaleFields();
  }


  // Tax tables and retirement calculation formulas run only on the private Render server.

  // progressiveTax runs only on the private Render server.


  

  // estimateCPPContribution runs only on the private Render server.



  // estimateEIPremium runs only on the private Render server.



  // calculateIncomeTax runs only on the private Render server.



  // averageTaxRate runs only on the private Render server.




  // netAfterTaxIncome runs only on the private Render server.




  // grossUpAfterTaxIncome runs only on the private Render server.


  function percent(value) {
    return (value * 100).toFixed(1) + "%";
  }



  const STORAGE_KEY = "canadianRetirementPlannerInputsV1";

  function collectPlannerInputs() {
    const data = {
      version: 1,
      savedAt: new Date().toISOString(),
      values: {}
    };

    document.querySelectorAll("select, input[type='text']").forEach(element => {
      if (element.id) {
        data.values[element.id] = element.type === "text" ? sanitizeText(element.value) : element.value;
      }
    });

    return data;
  }

  function applyPlannerInputs(data, showAlert = true) {
    if (!data || !data.values) {
      if (showAlert) alert("This file does not look like a valid planner scenario.");
      return false;
    }

    Object.entries(data.values).forEach(([id, val]) => {
      const element = document.getElementById(id);
      if (element) {
        element.value = element.type === "text" ? sanitizeText(val) : String(val);
      }
    });

    togglePerson2();
    calculate();

    if (showAlert) {
      alert("Planner inputs loaded.");
    }

    return true;
  }

  function saveInputs() {
    const data = collectPlannerInputs();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    alert("Planner inputs saved in this browser.");
  }

  function loadInputs() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      alert("No saved planner inputs were found in this browser.");
      return;
    }

    try {
      applyPlannerInputs(JSON.parse(saved), true);
    } catch (error) {
      alert("Saved inputs could not be loaded.");
    }
  }

  function clearSavedInputs() {
    localStorage.removeItem(STORAGE_KEY);
    alert("Saved planner inputs cleared from this browser.");
  }

  function exportInputs() {
    const data = collectPlannerInputs();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const date = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = "retirement-planner-scenario-" + date + ".json";
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  function importInputsFromFile(file) {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = event => {
      try {
        const data = JSON.parse(event.target.result);
        applyPlannerInputs(data, true);
      } catch (error) {
        alert("The selected file could not be imported. Please choose a valid JSON scenario file.");
      }
    };

    reader.readAsText(file);
  }


  function initialize() {
    ["p1CurrentAge", "p2CurrentAge"].forEach(id => populateAge(id, 18, 75, defaults[id]));
    ["p1RetirementAge", "p2RetirementAge"].forEach(id => populateAge(id, 50, 75, defaults[id]));
    ["p1LifeExpectancy", "p2LifeExpectancy"].forEach(id => populateAge(id, 70, 105, defaults[id]));
    ["p1CPPStartAge", "p2CPPStartAge"].forEach(id => populateAge(id, 60, 70, defaults[id]));
    ["p1OASStartAge", "p2OASStartAge"].forEach(id => populateAge(id, 65, 70, defaults[id]));

    [
      "p1CurrentAgeMonth", "p1RetirementAgeMonth", "p1LifeExpectancyMonth", "p1RRIFConversionAgeMonth",
      "p1CPPStartAgeMonth", "p1OASStartAgeMonth", "p1OtherStartAgeMonth", "p1OtherEndAgeMonth",
      "p2CurrentAgeMonth", "p2RetirementAgeMonth", "p2LifeExpectancyMonth", "p2RRIFConversionAgeMonth",
      "p2CPPStartAgeMonth", "p2OASStartAgeMonth", "p2OtherStartAgeMonth", "p2OtherEndAgeMonth"
    ].forEach(id => populateMonth(id, defaults[id] || 0));

    ["p1OtherStartAge", "p2OtherStartAge"].forEach(id => populateAge(id, 50, 105, defaults[id]));
    ["p1OtherEndAge", "p2OtherEndAge"].forEach(id => populateAge(id, 50, 105, defaults[id]));

    ["p1RRSPSavings", "p2RRSPSavings"].forEach(id => populateCurrency(id, 0, 2500000, 10000));
    ["p1TFSASavings", "p2TFSASavings"].forEach(id => populateCurrency(id, 0, 1500000, 1000));
    ["p1NonRegisteredBalance", "p2NonRegisteredBalance"].forEach(id => populateCurrency(id, 0, 1500000, 1000));
    ["p1RRIFConversionAge", "p2RRIFConversionAge"].forEach(id => populateAge(id, 55, 71, defaults[id]));
    ["p1RRSPContribution", "p2RRSPContribution", "p1TFSAContribution", "p2TFSAContribution"].forEach(id => {
      populateCurrency(id, 0, 1500, 10);
    });

    updateDesiredIncomeOptions();

    ["p1CPPIncome", "p2CPPIncome"].forEach(id => populateCurrency(id, 0, 25000, 500));
    ["p1OASIncome", "p2OASIncome"].forEach(id => populateCurrency(id, 0, 15000, 250));
    ["p1DBPension", "p2DBPension"].forEach(id => populateCurrency(id, 0, 150000, 1000));
    ["p1OtherIncome", "p2OtherIncome"].forEach(id => populateCurrency(id, 0, 150000, 1000));
    ["p1EmploymentIncome", "p2EmploymentIncome"].forEach(id => populateCurrency(id, 0, 250000, 5000));
    populateCurrency("homeCurrentValue", 0, 3000000, 10000);
    populateCurrency("newHomePrice", 0, 3000000, 10000);
    populatePercent("homeGrowthRate", 0, 10, 0.5, defaults.homeGrowthRate);
    populateAge("homeSaleAge", 50, 105, defaults.homeSaleAge);
    populateMonth("homeSaleAgeMonth", defaults.homeSaleAgeMonth || 0);


    for (let i = 1; i <= 5; i++) {
      populateAge("adjustment" + i + "Age", 50, 105, defaults["adjustment" + i + "Age"]);
      populateMonth("adjustment" + i + "AgeMonth", defaults["adjustment" + i + "AgeMonth"] || 0);
      populateCurrency("adjustment" + i + "Amount", 0, 20000, 250);
    }
    for (let i = 1; i <= 5; i++) {
      populateAge("lumpSum" + i + "Age", 50, 105, defaults["lumpSum" + i + "Age"]);
      populateMonth("lumpSum" + i + "AgeMonth", defaults["lumpSum" + i + "AgeMonth"] || 0);
      populateCurrency("lumpSum" + i + "Amount", 0, 500000, 5000);
    }

    populatePercent("returnRate", 0, 10, 0.5, defaults.returnRate);
    populatePercent("postRetirementReturnRate", 0, 10, 0.5, defaults.postRetirementReturnRate);
    populatePercent("inflationRate", 0, 6, 0.5, defaults.inflationRate);

    setDefaults();

    const autosavedScenario = localStorage.getItem(STORAGE_KEY);
    if (autosavedScenario) {
      try {
        applyPlannerInputs(JSON.parse(autosavedScenario), false);
      } catch (error) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    document.getElementById("calculateBtn").addEventListener("click", calculate);
    document.getElementById("resetBtn").addEventListener("click", () => {
      setDefaults();
      calculate();
    });

    document.getElementById("saveInputsBtn").addEventListener("click", saveInputs);
    document.getElementById("loadInputsBtn").addEventListener("click", loadInputs);
    document.getElementById("clearSavedInputsBtn").addEventListener("click", clearSavedInputs);
    document.getElementById("exportInputsBtn").addEventListener("click", exportInputs);

    document.getElementById("importInputsBtn").addEventListener("click", () => {
      document.getElementById("importFileInput").click();
    });

    document.getElementById("importFileInput").addEventListener("change", event => {
      importInputsFromFile(event.target.files[0]);
      event.target.value = "";
    });

    document.querySelectorAll("select").forEach(el => {
      el.addEventListener("change", () => {
        if (el.id === "householdMode") togglePerson2();
        if (el.id === "desiredIncomeFrequency") updateDesiredIncomeOptions();
        if (el.id === "sellHomeOption" || el.id === "homeSaleType") toggleHomeSaleFields();
        calculate();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectPlannerInputs()));
      });
    });

    document.querySelectorAll("input[type='text']").forEach(el => {
      el.addEventListener("input", () => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(collectPlannerInputs()));
      });
    });

    calculate();
  }

  function togglePerson2() {
    const isCouple = selected("householdMode") === "couple";
    document.getElementById("person2Block").classList.toggle("hidden", !isCouple);
  }



  // cppAdjustmentFactor runs only on the private Render server.



  // oasAdjustmentFactor runs only on the private Render server.



  // oasAge75Factor runs only on the private Render server.



  // adjustedCPPAnnual runs only on the private Render server.



  // adjustedOASAnnual runs only on the private Render server.





  // rrifMinimumFactor runs only on the private Render server.




  // readPerson runs only on the private Render server.



  // projectToRetirement runs only on the private Render server.





  // annualToMonthlyRate runs only on the private Render server.




  // readIncomeRequirementAdjustments runs only on the private Render server.



  // annualIncomeRequirementAdjustment runs only on the private Render server.






  // ageFallsWithinProjectionYear runs only on the private Render server.





  // lumpSumMonthInProjectionYear runs only on the private Render server.



  // monthIndexWithinProjectionYear runs only on the private Render server.



  // addToAccount runs only on the private Render server.



  // applyScheduledLumpSums runs only on the private Render server.




  // readLumpSumRemovals runs only on the private Render server.



  // resetLumpSumAvailableBalances runs only on the private Render server.



  // getAccountBalanceForRemoval runs only on the private Render server.



  // removeFromAccount runs only on the private Render server.





  // annualContributionAmount runs only on the private Render server.



  // advancePreRetirementOneYear runs only on the private Render server.



  // growRetirementAccountsMonthly runs only on the private Render server.




  // projectReplacementHomeValue runs only on the private Render server.



  // applyHomeSaleIfScheduled runs only on the private Render server.




  function showValidationError(message) {
    const status = document.getElementById("statusBadge");
    if (status) {
      status.className = "status warn";
      status.textContent = message;
    }
    alert(message);
  }




  async function calculate() {
    const status = document.getElementById("statusBadge");
    if (status) {
      status.className = "status good";
      status.textContent = "Calculating securely...";
    }

    try {
      const response = await fetch(API_BASE_URL + "/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(collectPlannerInputs().values)
      });

      let result = {};
      try {
        result = await response.json();
      } catch (jsonError) {
        result = {};
      }

      if (!response.ok) {
        throw new Error(result.error || "The private calculation server could not complete the projection.");
      }

      const rows = result.rows || [];
      updateSummary(rows);
      drawIncomeChart(rows);
      drawBalanceChart(rows);
      updateTable(rows);

      if (status) {
        status.className = "status good";
        status.textContent = "Projection ready";
      }
    } catch (error) {
      if (status) {
        status.className = "status warn";
        status.textContent = error.message || "Calculation failed.";
      } else {
        alert(error.message || "Calculation failed.");
      }
    }
  }




  function getDisplayDivisor() {
    return selected("chartFrequency") === "monthly" ? 12 : 1;
  }

  function getDisplayLabel() {
    return selected("chartFrequency") === "monthly" ? "Monthly" : "Annual";
  }


  function personInvestmentAtRetirement(rows, personKey) {
    const retirementAgeMonths = personKey === "p1"
      ? ageInTotalMonths("p1RetirementAge", "p1RetirementAgeMonth")
      : ageInTotalMonths("p2RetirementAge", "p2RetirementAgeMonth");

    const row = rows.find(item => {
      const ageMonths = personKey === "p1" ? item.p1AgeMonths : item.p2AgeMonths;
      return ageMonths >= retirementAgeMonths;
    });

    if (!row) return 0;

    if (personKey === "p1") {
      return (row.endingP1RRSP || 0) +
        (row.endingP1TFSA || 0) +
        (row.endingP1NonRegistered || 0);
    }

    return (row.endingP2RRSP || 0) +
      (row.endingP2TFSA || 0) +
      (row.endingP2NonRegistered || 0);
  }



  function rowDisplayTotalIncome(row, divisor) {
    return (
      chartValue(row, "rrspWithdrawal", divisor) +
      chartValue(row, "rrifMinimumWithdrawal", divisor) +
      chartValue(row, "tfsaWithdrawal", divisor) +
      chartValue(row, "nonRegisteredWithdrawal", divisor) +
      chartValue(row, "cpp", divisor) +
      chartValue(row, "oas", divisor) +
      chartValue(row, "dbPension", divisor) +
      chartValue(row, "other", divisor) +
      chartValue(row, "employment", divisor)
    );
  }


  function rowAfterTaxTotalIncomeAnnual(row) {
    const p1Tax = (row.p1TaxableIncome || 0) * (row.p1AverageTaxRate || 0);
    const p2Tax = (row.p2TaxableIncome || 0) * (row.p2AverageTaxRate || 0);
    return Math.max(0, (row.p1TotalIncome || 0) + (row.p2TotalIncome || 0) - p1Tax - p2Tax);
  }

  function updateScenarioSummary(firstRetirementRow) {
    const setText = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    const desiredPreTax = firstRetirementRow
      ? (firstRetirementRow.targetBeforeTaxAnnual || firstRetirementRow.targetAnnual || 0)
      : 0;

    const actualAfterTaxMonthly = firstRetirementRow
      ? rowAfterTaxTotalIncomeAnnual(firstRetirementRow) / 12
      : 0;

    setText("scenarioDesiredPreTax", formatMoney(desiredPreTax));
    setText("scenarioActualAfterTax", formatMoney(actualAfterTaxMonthly));
    setText("scenarioPreReturn", value("returnRate").toFixed(1) + "%");
    setText("scenarioPostReturn", value("postRetirementReturnRate").toFixed(1) + "%");
    setText("scenarioInflation", value("inflationRate").toFixed(1) + "%");
    setText("scenarioHomeGrowth", value("homeGrowthRate").toFixed(1) + "%");
    setText("scenarioP1RetAge", formatAgeYearsMonths(ageInYears("p1RetirementAge", "p1RetirementAgeMonth")));

    if (selected("householdMode") === "couple") {
      setText("scenarioP2RetAge", formatAgeYearsMonths(ageInYears("p2RetirementAge", "p2RetirementAgeMonth")));
    } else {
      setText("scenarioP2RetAge", "N/A");
    }
  }


  function updateSummary(rows, p1, p2, realReturn, postRetirementRealReturn, monthlyPostRetirementRealReturn) {
    const first = rows.find(row => row.isRetirementProjectionYear) || rows[0];
    const last = rows[rows.length - 1];
    const divisor = getDisplayDivisor();

    updateScenarioSummary(first);

    const hasShortfall = rows.some(row => row.shortfall > 0);
    const status = document.getElementById("statusBadge");

    status.className = "status " + (hasShortfall ? "warn" : "good");
    status.textContent = hasShortfall
      ? "Projected shortfall appears in retirement"
      : "Projected income target is covered";

    document.getElementById("metricRRSP").textContent = formatMoney(personInvestmentAtRetirement(rows, "p1"));
    document.getElementById("metricTFSA").textContent = selected("householdMode") === "couple"
      ? formatMoney(personInvestmentAtRetirement(rows, "p2"))
      : "N/A";
    const metricTargetValue = first.targetDisplayAnnual || first.targetAnnual || 0;

    document.getElementById("metricTarget").textContent = formatMoney(metricTargetValue / divisor);

    const p1MetricCard = document.getElementById("metricRRSP")?.closest(".metric");
    if (p1MetricCard) {
      p1MetricCard.title = "Total projected Person 1 investments in the year Person 1 retires: RRSP/RRIF, TFSA, and non-registered.";
    }

    const p2MetricCard = document.getElementById("metricTFSA")?.closest(".metric");
    if (p2MetricCard) {
      p2MetricCard.title = "Total projected Person 2 investments in the year Person 2 retires: RRSP/RRIF, TFSA, and non-registered.";
    }
    document.getElementById("metricRemaining").textContent = formatMoney(last.remainingRRSP + last.remainingTFSA + last.remainingNonRegistered);

    const homeMetric = document.getElementById("metricHomeValue");
    const homeCard = document.getElementById("metricHomeCard");
    const finalHomeValue = last.homeValue || 0;
    if (homeMetric) homeMetric.textContent = formatMoney(finalHomeValue);
    if (homeCard) {
      homeCard.title = (last.homeSold ? "Home sale or downsizing occurred during the projection. Any investable proceeds were added to non-registered investments. " : "Projected market value of the home at the final projection age. ") + "Total home sale or downsizing proceeds added: " + formatMoney(rows.reduce((sum, row) => sum + (row.homeSaleProceeds || 0), 0)) + ".";
    }

    const goalCard = document.getElementById("metricGoalCard");
    const goalValue = document.getElementById("metricGoalPercent");
    const goalNote = document.getElementById("metricGoalNote");

    if (goalCard && goalValue) {
      const retirementRows = rows.filter(row => row.isRetirementProjectionYear);
      const lifetimeAvailableIncome = retirementRows.reduce((sum, row) => {
        return sum + rowDisplayTotalIncome(row, 1);
      }, 0);

      const lifetimeRequiredIncome = retirementRows.reduce((sum, row) => {
        return sum + chartTargetValue(row, 1);
      }, 0);

      const endingSavings =
        (last.remainingRRSP || 0) +
        (last.remainingTFSA || 0) +
        (last.remainingNonRegistered || 0);

      const lifetimeCoveredIncome = retirementRows.reduce((sum, row) => {
        const availableIncome = rowDisplayTotalIncome(row, 1);
        const requiredIncome = chartTargetValue(row, 1);
        return sum + Math.min(availableIncome, requiredIncome);
      }, 0);

      const lifetimeShortfall = retirementRows.reduce((sum, row) => {
        const availableIncome = rowDisplayTotalIncome(row, 1);
        const requiredIncome = chartTargetValue(row, 1);
        return sum + Math.max(0, requiredIncome - availableIncome);
      }, 0);

      const fundingRatioPercent = lifetimeRequiredIncome > 0
        ? ((lifetimeCoveredIncome + endingSavings) / lifetimeRequiredIncome) * 100
        : 0;

      goalValue.textContent = fundingRatioPercent.toFixed(0) + "%";

      const noteText =
        "Funding Ratio: " + fundingRatioPercent.toFixed(0) + "%" +
        ". Covered Income: " + formatMoney(lifetimeCoveredIncome) +
        ". Income Required: " + formatMoney(lifetimeRequiredIncome) +
        ". Lifetime Shortfall: " + formatMoney(lifetimeShortfall) +
        ". Ending Savings: " + formatMoney(endingSavings) +
        ". Formula: (covered income + ending savings) divided by required income.";

      goalCard.title = noteText;
      if (goalNote) goalNote.textContent = noteText;
    }

    const metricRemainingCard = document.getElementById("metricRemainingCard");
    if (metricRemainingCard) {
      metricRemainingCard.title =
        "Final projected total at the last projection age. Includes ending RRSP/RRIF, TFSA, and non-registered balances. See the projection table for opening and ending RRSP/RRIF balances by year.";
    }

    const viewText = selected("incomeView") === "afterTax" ? "after-tax target grossed up using tax brackets" : "before tax";
    const targetNoteText =
      getDisplayLabel().toLowerCase() + ", " + viewText +
      ". Real return before retirement: " + (realReturn * 100).toFixed(2) +
      "%. Post-retirement investment return used: " + (postRetirementRealReturn * 100).toFixed(2) +
      "%, compounded monthly at " + (monthlyPostRetirementRealReturn * 100).toFixed(3) +
      "%. Inflation adjustment to returns is applied only in constant dollar view.";

    document.getElementById("metricTargetNote").textContent = targetNoteText;
    const metricTargetCard = document.getElementById("metricTargetCard");
    if (metricTargetCard) {
      metricTargetCard.title = targetNoteText;
    }
  }


  function chartValue(row, key, divisor) {
    if (selected("chartTaxView") !== "afterTax") {
      return (row[key] || 0) / divisor;
    }

    const p1TaxRate = row.p1AverageTaxRate || 0;
    const p2TaxRate = row.p2AverageTaxRate || 0;
    const p1Share = row["p1_" + key] || 0;
    const p2Share = row["p2_" + key] || 0;

    if (p1Share || p2Share) {
      return ((p1Share * (1 - p1TaxRate)) + (p2Share * (1 - p2TaxRate))) / divisor;
    }

    if (key === "tfsaWithdrawal" || key === "nonRegisteredWithdrawal") {
      return (row[key] || 0) / divisor;
    }

    return (row[key] || 0) / divisor;
  }

  function chartTargetValue(row, divisor) {
    if (selected("chartTaxView") === "afterTax") {
      return (row.targetAfterTaxAnnual || 0) / divisor;
    }

    return (row.targetBeforeTaxAnnual || row.targetAnnual || 0) / divisor;
  }



  function chartRowsFromRetirement(rows) {
    return rows.filter(row => row.isRetirementProjectionYear);
  }



  function chartBaselineTargetValue(row, divisor) {
    if (selected("chartTaxView") === "afterTax") {
      return (row.baselineTargetAfterTaxAnnual || 0) / divisor;
    }

    return (row.baselineTargetBeforeTaxAnnual || row.baselineTargetAnnual || 0) / divisor;
  }


  function drawIncomeChart(rows) {
    rows = chartRowsFromRetirement(rows);
    const ctx = document.getElementById("incomeChart");
    const divisor = getDisplayDivisor();
    const period = getDisplayLabel();
    const dollarView = selected("dollarView") === "inflationAdjusted"
      ? "Inflation adjusted"
      : "Constant dollar";
    const taxView = selected("chartTaxView") === "afterTax" ? "After tax" : "Before tax";

    if (incomeChart) incomeChart.destroy();

    if (!rows.length) return;

    const incomeChartMax = Math.max(
      1,
      ...rows.map(row => {
        const stackedIncome =
          chartValue(row, "rrspWithdrawal", divisor) +
          chartValue(row, "rrifMinimumWithdrawal", divisor) +
          chartValue(row, "tfsaWithdrawal", divisor) +
          chartValue(row, "nonRegisteredWithdrawal", divisor) +
          chartValue(row, "cpp", divisor) +
          chartValue(row, "oas", divisor) +
          chartValue(row, "dbPension", divisor) +
          chartValue(row, "other", divisor) +
          chartValue(row, "employment", divisor);

        return Math.max(
          stackedIncome,
          chartBaselineTargetValue(row, divisor),
          chartTargetValue(row, divisor)
        );
      })
    ) * 1.08;

    incomeChart = new Chart(ctx, {
      data: {
        labels: rows.map(row => "Year " + row.year + " (" + row.ageLabel + ")"),
        datasets: [
          {
            type: "bar",
            label: "Additional RRSP/RRIF withdrawals",
            data: rows.map(row => chartValue(row, "rrspWithdrawal", divisor)),
            backgroundColor: "#2563eb",
            stack: "income"
          },
          {
            type: "bar",
            label: "RRIF minimum withdrawals",
            data: rows.map(row => chartValue(row, "rrifMinimumWithdrawal", divisor)),
            backgroundColor: "#93c5fd",
            stack: "income"
          },
          {
            type: "bar",
            label: "TFSA withdrawals",
            data: rows.map(row => chartValue(row, "tfsaWithdrawal", divisor)),
            backgroundColor: "#7c3aed",
            stack: "income"
          },
          {
            type: "bar",
            label: "Non-registered withdrawals",
            data: rows.map(row => chartValue(row, "nonRegisteredWithdrawal", divisor)),
            backgroundColor: "#0891b2",
            stack: "income"
          },
          {
            type: "bar",
            label: "CPP",
            data: rows.map(row => chartValue(row, "cpp", divisor)),
            backgroundColor: "#dc2626",
            stack: "income"
          },
          {
            type: "bar",
            label: "OAS",
            data: rows.map(row => chartValue(row, "oas", divisor)),
            backgroundColor: "#facc15",
            stack: "income"
          },
          {
            type: "bar",
            label: "Defined benefit pension",
            data: rows.map(row => chartValue(row, "dbPension", divisor)),
            backgroundColor: "#0f766e",
            stack: "income"
          },
          {
            type: "bar",
            label: "Other income",
            data: rows.map(row => chartValue(row, "other", divisor)),
            backgroundColor: "#64748b",
            stack: "income"
          },
          {
            type: "bar",
            label: "Employment income",
            data: rows.map(row => chartValue(row, "employment", divisor)),
            backgroundColor: "#14b8a6",
            stack: "income"
          },
          {
            type: "line",
            label: "Baseline income before adjustments",
            data: rows.map(row => chartBaselineTargetValue(row, divisor)),
            yAxisID: "targetY",
            borderColor: "#111827",
            backgroundColor: "#111827",
            borderWidth: 2,
            borderDash: [6, 5],
            pointRadius: 1,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.25
          },
          {
            type: "line",
            label: "Desired household income after adjustments",
            data: rows.map(row => chartTargetValue(row, divisor)),
            yAxisID: "targetY",
            borderColor: "#dc2626",
            backgroundColor: "#dc2626",
            borderWidth: 3,
            pointRadius: 2,
            pointHoverRadius: 6,
            fill: false,
            tension: 0.25
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          title: { display: true, text: period + " Retirement Income by Age - " + dollarView + " - " + taxView },
          tooltip: {
            callbacks: {
              beforeBody: tooltipItems => {
                if (!tooltipItems.length) return "";

                const index = tooltipItems[0].dataIndex;
                const row = rows[index];

                const totalIncome =
                  chartValue(row, "rrspWithdrawal", divisor) +
                  chartValue(row, "rrifMinimumWithdrawal", divisor) +
                  chartValue(row, "tfsaWithdrawal", divisor) +
                  chartValue(row, "nonRegisteredWithdrawal", divisor) +
                  chartValue(row, "cpp", divisor) +
                  chartValue(row, "oas", divisor) +
                  chartValue(row, "dbPension", divisor) +
                  chartValue(row, "other", divisor) +
                  chartValue(row, "employment", divisor);

                const targetIncome = chartTargetValue(row, divisor);
                const variance = totalIncome - targetIncome;
                const varianceLabel = variance >= 0 ? "Surplus" : "Shortfall";

                const p1Taxable = row.p1TaxableIncome || 0;
                const p2Taxable = row.p2TaxableIncome || 0;
                const estimatedTax =
                  (p1Taxable * (row.p1AverageTaxRate || 0)) +
                  (p2Taxable * (row.p2AverageTaxRate || 0));
                const estimatedTaxForDisplay = estimatedTax / divisor;

                const lines = [
                  "Total income: " + formatMoney(totalIncome),
                  "Target income: " + formatMoney(targetIncome),
                  varianceLabel + ": " + formatMoney(Math.abs(variance))
                ];

                if (selected("chartTaxView") === "beforeTax") {
                  lines.push("Estimated taxes: " + formatMoney(estimatedTaxForDisplay));
                  lines.push("Estimated after-tax income: " + formatMoney(Math.max(0, totalIncome - estimatedTaxForDisplay)));
                } else {
                  const beforeTaxEquivalent = (row.targetBeforeTaxAnnual || row.targetAnnual || 0) / divisor;
                  lines.push("Before-tax target equivalent: " + formatMoney(beforeTaxEquivalent));
                }

                lines.push("────────────");

                return lines;
              },
              label: context => context.dataset.label + ": " + formatMoney(context.parsed.y)
            }
          },
          legend: { position: "bottom" }
        },
        scales: {
          x: {
            stacked: true,
            title: { display: true, text: "Projection year (Person 1 age / Person 2 age)" },
            ticks: { font: { size: 9 }, maxRotation: 45, minRotation: 45 }
          },
          y: {
            stacked: true,
            beginAtZero: true,
            max: incomeChartMax,
            title: { display: true, text: period + " income (" + taxView.toLowerCase() + ")" },
            ticks: { callback: value => formatMoney(value) }
          },
          targetY: {
            stacked: false,
            display: false,
            beginAtZero: true,
            min: 0,
            max: incomeChartMax,
            grid: { drawOnChartArea: false }
          }
        }
      }
    });
  }

  function drawBalanceChart(rows) {
    rows = chartRowsFromRetirement(rows);
    const ctx = document.getElementById("balanceChart");
    if (balanceChart) balanceChart.destroy();

    if (!rows.length) return;

    balanceChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: rows.map(row => "Year " + row.year + " (" + row.ageLabel + ")"),
        datasets: [
          {
            label: "Person 1 RRSP/RRIF balance",
            data: rows.map(row => row.endingP1RRSP || 0),
            borderColor: "#2563eb",
            backgroundColor: "#2563eb",
            borderWidth: 3,
            pointRadius: 1,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.25
          },
          {
            label: "Person 2 RRSP/RRIF balance",
            data: rows.map(row => row.endingP2RRSP || 0),
            borderColor: "#60a5fa",
            backgroundColor: "#60a5fa",
            borderWidth: 3,
            pointRadius: 1,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.25
          },
          {
            label: "Combined RRSP/RRIF balance",
            data: rows.map(row => row.endingRRSP || row.remainingRRSP || 0),
            borderColor: "#1e3a8a",
            backgroundColor: "#1e3a8a",
            borderWidth: 2,
            pointRadius: 1,
            pointHoverRadius: 5,
            borderDash: [6, 4],
            fill: false,
            tension: 0.25
          },
          {
            label: "Household TFSA balance",
            data: rows.map(row => row.remainingTFSA),
            borderColor: "#7c3aed",
            backgroundColor: "#7c3aed",
            borderWidth: 3,
            pointRadius: 1,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.25
          },
          {
            label: "Household non-registered balance",
            data: rows.map(row => row.remainingNonRegistered),
            borderColor: "#0891b2",
            backgroundColor: "#0891b2",
            borderWidth: 3,
            pointRadius: 1,
            pointHoverRadius: 5,
            fill: false,
            tension: 0.25
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: "index", intersect: false },
        plugins: {
          tooltip: {
            callbacks: {
              label: context => context.dataset.label + ": " + formatMoney(context.parsed.y)
            }
          },
          legend: { position: "bottom" }
        },
        scales: {
          y: {
            title: { display: true, text: "Remaining household balance" },
            ticks: { callback: value => formatMoney(value) }
          }
        }
      }
    });
  }

  function updateTable(rows) {
    const divisor = getDisplayDivisor();
    const householdBody = document.getElementById("householdProjectionTable");
    const p1Body = document.getElementById("person1ProjectionTable");
    const p2Body = document.getElementById("person2ProjectionTable");
    const p2Block = document.getElementById("person2ProjectionBlock");

    if (p2Block) {
      p2Block.classList.toggle("hidden", !isCoupleModeForDisplay());
    }

    householdBody.innerHTML = "";
    p1Body.innerHTML = "";
    if (p2Body) p2Body.innerHTML = "";

    rows.forEach(row => {
      const ages = String(row.ageLabel || "").split(" / ");
      const p1Age = ages[0] || "";
      const p2Age = ages[1] || "";

      const totalIncome =
        (row.rrspWithdrawal || 0) +
        (row.rrifMinimumWithdrawal || 0) +
        (row.tfsaWithdrawal || 0) +
        (row.nonRegisteredWithdrawal || 0) +
        (row.cpp || 0) +
        (row.oas || 0) +
        (row.dbPension || 0) +
        (row.other || 0) +
        (row.employment || 0);

      const surplusShortfall = totalIncome - (row.targetAnnual || 0);

      const householdRow = document.createElement("tr");
      householdRow.innerHTML = `
        <td>${row.year}</td>
        <td>${row.ageLabel}</td>
        <td>${row.aliveLabel}</td>
        <td>${formatMoney((row.targetAnnual || 0) / divisor)}</td>
        <td>${formatMoney((row.baselineTargetAnnual || 0) / divisor)}</td>
        <td>${formatMoney(totalIncome / divisor)}</td>
        <td>${formatMoney(surplusShortfall / divisor)}</td>
        <td>${formatMoney((row.customRequirementAdjustment || 0) / divisor)}</td>
        <td>${escapeHtml(row.activeAdjustmentDescriptions || "")}</td>
        <td>${formatMoney(row.lumpSumNetChange || 0)}</td>
        <td>${escapeHtml(row.lumpSumDescription || "")}</td>
        <td>${formatMoney(row.lumpSumShortfall || 0)}</td>
        <td>${formatMoney(row.endingRRSP || row.remainingRRSP || 0)}</td>
        <td>${formatMoney(row.remainingTFSA || 0)}</td>
        <td>${formatMoney(row.remainingNonRegistered || 0)}</td>
      `;
      householdBody.appendChild(householdRow);

      const p1Row = document.createElement("tr");
      p1Row.innerHTML = `
        <td>${row.year}</td>
        <td>${p1Age}</td>
        <td>${formatMoney((row.p1_cpp || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_oas || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_dbPension || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_other || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_employment || 0) / divisor)}</td>
        <td>${formatMoney((row.p1RRIFMinimumWithdrawal || 0) / divisor)}</td>
        <td>${formatMoney((row.p1AdditionalRRSPWithdrawal || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_tfsaWithdrawal || 0) / divisor)}</td>
        <td>${formatMoney((row.p1_nonRegisteredWithdrawal || 0) / divisor)}</td>
        <td>${formatMoney((row.p1TotalIncome || 0) / divisor)}</td>
        <td>${formatMoney(row.p1TaxableIncome || 0)}</td>
        <td>${percent(row.p1AverageTaxRate || 0)}</td>
        <td>${formatMoney(row.openingP1RRSP || 0)}</td>
        <td>${formatMoney(row.endingP1RRSP || 0)}</td>
        <td>${formatMoney(row.endingP1TFSA || 0)}</td>
        <td>${formatMoney(row.endingP1NonRegistered || 0)}</td>
      `;
      p1Body.appendChild(p1Row);

      if (p2Body && isCoupleModeForDisplay()) {
        const p2Row = document.createElement("tr");
        p2Row.innerHTML = `
          <td>${row.year}</td>
          <td>${p2Age}</td>
          <td>${formatMoney((row.p2_cpp || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_oas || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_dbPension || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_other || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_employment || 0) / divisor)}</td>
          <td>${formatMoney((row.p2RRIFMinimumWithdrawal || 0) / divisor)}</td>
          <td>${formatMoney((row.p2AdditionalRRSPWithdrawal || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_tfsaWithdrawal || 0) / divisor)}</td>
          <td>${formatMoney((row.p2_nonRegisteredWithdrawal || 0) / divisor)}</td>
          <td>${formatMoney((row.p2TotalIncome || 0) / divisor)}</td>
          <td>${formatMoney(row.p2TaxableIncome || 0)}</td>
          <td>${percent(row.p2AverageTaxRate || 0)}</td>
          <td>${formatMoney(row.openingP2RRSP || 0)}</td>
          <td>${formatMoney(row.endingP2RRSP || 0)}</td>
          <td>${formatMoney(row.endingP2TFSA || 0)}</td>
          <td>${formatMoney(row.endingP2NonRegistered || 0)}</td>
        `;
        p2Body.appendChild(p2Row);
      }
    });
  }


  const rotatingAds = [
    { title: "Advisor spotlight", size: "300 x 250 or sponsored card", note: "Suggested use: retirement advisor, financial planner, or planning review offer." },
    { title: "Insurance partner", size: "300 x 250 or sponsored card", note: "Suggested use: life insurance, critical illness, or estate planning partner." },
    { title: "Mortgage / banking partner", size: "300 x 250 or sponsored card", note: "Suggested use: mortgage broker, banking, lending, or debt-management partner." }
  ];

  let rotatingAdIndex = 0;

  function updateRotatingAd() {
    const content = document.getElementById("rotatingAdContent");
    const note = document.getElementById("rotatingAdNote");
    if (!content || !note) return;
    const ad = rotatingAds[rotatingAdIndex % rotatingAds.length];
    content.style.opacity = "0";
    setTimeout(() => {
      content.innerHTML = '<span><span class="rotating-ad-title">' + escapeHtml(ad.title) + '</span><span class="rotating-ad-size">' + escapeHtml(ad.size) + '</span></span>';
      note.textContent = ad.note + " Rotates every 30 seconds.";
      content.style.opacity = "1";
      rotatingAdIndex += 1;
    }, 250);
  }

  function startRotatingAds() {
    updateRotatingAd();
    setInterval(updateRotatingAd, 30000);
  }


  startRotatingAds();

  initialize();
