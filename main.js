document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tax-calculator-form");
    const resultsDiv = document.getElementById("results");

    const federalTaxEl = document.getElementById("federal-tax");
    const stateTaxEl = document.getElementById("state-tax");
    const oasdiTaxEl = document.getElementById("oasdi-tax");
    const medicareTaxEl = document.getElementById("medicare-tax");
    const netIncomeEl = document.getElementById("net-income");
    const monthlyNetIncomeEl = document.getElementById("monthly-net-income");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const filingYear = document.getElementById("filing-year").value;
        const filingStatus = document.querySelector("input[name='filing-status']:checked")?.value;
        const filingState = document.getElementById("filing-state").value;
        const incomeNet = parseFloat(document.getElementById("income").value);

        if (!filingStatus) {
            alert("Please select a filing status.");
            return;
        }

        if (isNaN(incomeNet) || incomeNet <= 0) {
            alert("Please enter a valid income.");
            return;
        }

        const taxData = calculateTaxes(filingStatus, incomeNet);

        federalTaxEl.textContent = taxData.federalTax.toFixed(2);
        stateTaxEl.textContent = taxData.stateTax.toFixed(2);
        oasdiTaxEl.textContent = taxData.oasdiTax.toFixed(2);
        medicareTaxEl.textContent = taxData.medicareTax.toFixed(2);
        netIncomeEl.textContent = taxData.netIncome.toFixed(2);
        monthlyNetIncomeEl.textContent = taxData.monthlyNetIncome.toFixed(2);

        resultsDiv.classList.remove("hidden");
    });
});

// Federal tax brackets for different filing statuses
const taxBrackets = {
    single: [
        { rate: 0.10, min: 0, max: 11600, baseTax: 0 },
        { rate: 0.12, min: 11601, max: 47150, baseTax: 1160 },
        { rate: 0.22, min: 47151, max: 100525, baseTax: 5426 },
        { rate: 0.24, min: 100526, max: 191950, baseTax: 17168.50 },
        { rate: 0.32, min: 191951, max: 243725, baseTax: 39110.50 },
        { rate: 0.35, min: 243726, max: 609350, baseTax: 55678.50 },
        { rate: 0.37, min: 609351, max: Infinity, baseTax: 183647.25 }
    ],
    "married-joint": [
        { rate: 0.10, min: 0, max: 23200, baseTax: 0 },
        { rate: 0.12, min: 23201, max: 94300, baseTax: 2320 },
        { rate: 0.22, min: 94301, max: 201050, baseTax: 10852 },
        { rate: 0.24, min: 201051, max: 383900, baseTax: 34337 },
        { rate: 0.32, min: 383901, max: 487450, baseTax: 78221 },
        { rate: 0.35, min: 487451, max: 731200, baseTax: 111357 },
        { rate: 0.37, min: 731201, max: Infinity, baseTax: 196669.50 }
    ],
    "married-separate": [
        { rate: 0.10, min: 0, max: 11600, baseTax: 0 },
        { rate: 0.12, min: 11601, max: 47150, baseTax: 1160 },
        { rate: 0.22, min: 47151, max: 100525, baseTax: 5426 },
        { rate: 0.24, min: 100526, max: 191950, baseTax: 17168.50 },
        { rate: 0.32, min: 191951, max: 243725, baseTax: 39110.50 },
        { rate: 0.35, min: 243726, max: 365600, baseTax: 55678.50 },
        { rate: 0.37, min: 365601, max: Infinity, baseTax: 98334.75 }
    ],
    "head-of-household": [
        { rate: 0.10, min: 0, max: 16550, baseTax: 0 },
        { rate: 0.12, min: 16551, max: 63100, baseTax: 1655 },
        { rate: 0.22, min: 63101, max: 100500, baseTax: 7241 },
        { rate: 0.24, min: 100501, max: 191950, baseTax: 15469 },
        { rate: 0.32, min: 191951, max: 243700, baseTax: 37417 },
        { rate: 0.35, min: 243701, max: 609350, baseTax: 53977 },
        { rate: 0.37, min: 609351, max: Infinity, baseTax: 181954.50 }
    ]
};

// Helper functions for tax calculations
function calculateFederalTax(income, brackets) {
    for (const bracket of brackets) {
        if (income >= bracket.min && income <= bracket.max) {
            return bracket.baseTax + ((income - bracket.min) * bracket.rate);
        }
    }
    return 0;
}

function calculateMichiganTax(income) {
    return income * 0.0425;
}

function calculateOASDITax(income, oasdiLimit = 168600) {
    return income <= oasdiLimit ? income * 0.062 : oasdiLimit * 0.062;
}

function calculateMedicareTax(income, medicareThreshold = 200000) {
    const baseMedicareTax = income * 0.0145;
    const additionalMedicareTax = income > medicareThreshold ? (income - medicareThreshold) * 0.009 : 0;
    return baseMedicareTax + additionalMedicareTax;
}

function calculateNetIncome(income, federalTax, stateTax, oasdiTax, medicareTax) {
    return income - (federalTax + stateTax + oasdiTax + medicareTax);
}

// Main tax calculation function
function calculateTaxes(filingStatus, income) {
    const brackets = taxBrackets[filingStatus];
    if (!brackets) {
        alert("Invalid filing status selected.");
        return;
    }

    const federalTax = calculateFederalTax(income, brackets);
    const stateTax = calculateMichiganTax(income);
    const oasdiTax = calculateOASDITax(income);
    const medicareTax = calculateMedicareTax(income);
    const netIncome = calculateNetIncome(income, federalTax, stateTax, oasdiTax, medicareTax);

    return {
        federalTax,
        stateTax,
        oasdiTax,
        medicareTax,
        netIncome,
        monthlyNetIncome: netIncome / 12
    };
}
