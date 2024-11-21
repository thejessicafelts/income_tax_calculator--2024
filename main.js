document.addEventListener("DOMContentLoaded", () => {
    // References to filing status divs
    const singleDiv = document.getElementById("singleDiv");
    const marriedJointDiv = document.getElementById("marriedJointDiv");
    const marriedSeparateDiv = document.getElementById("marriedSeparateDiv");
    const headOfHouseholdDiv = document.getElementById("headOfHouseholdDiv");
  
    // Hide all input divs
    function hideAllDivs() {
        singleDiv.classList.add("hidden");
        marriedJointDiv.classList.add("hidden");
        marriedSeparateDiv.classList.add("hidden");
        headOfHouseholdDiv.classList.add("hidden");
    }
  
    // Show specific div based on the selection
    document.getElementById("single").addEventListener("click", () => {
        hideAllDivs();
        singleDiv.classList.remove("hidden");
    });
  
    document.getElementById("marriedJoint").addEventListener("click", () => {
        hideAllDivs();
        marriedJointDiv.classList.remove("hidden");
    });
  
    document.getElementById("marriedSeparate").addEventListener("click", () => {
        hideAllDivs();
        marriedSeparateDiv.classList.remove("hidden");
    });
  
    document.getElementById("headOfHousehold").addEventListener("click", () => {
        hideAllDivs();
        headOfHouseholdDiv.classList.remove("hidden");
    });
});

/**
 *  2024 Federal Income Tax Brackets
 *  Filing Single
 * 
 *  |-----------|------------------------------------|----------------------------------------------------------|
 *  | Tax Rate  |   Taxable Income Bracket           |   Tax Owed                                               |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  |    10%    |               up to $  11,600.00   |                    10% of taxable income                 |
 *  |    12%    |   $  11,601.00  to  $  47,150.00   |   $   1,160.00  +  12% of the amount over $  11,600.00   |
 *  |    22%    |   $  47,151.00  to  $ 100,525.00   |   $   5,426.00  +  22% of the amount over $  47,150.00   |
 *  |    24%    |   $ 100,526.00  to  $ 191,950.00   |   $  17,168.50  +  24% of the amount over $ 100,525.00   |
 *  |    32%    |   $ 191,951.00  to  $ 243,725.00   |   $  39,110.50  +  32% of the amount over $ 191,950.00   |
 *  |    35%    |   $ 243,726.00  to  $ 609,350.00   |   $  55,678.50  +  35% of the amount over $ 243,725.00   |
 *  |    37%    |   $ 609,351.00 or more             |   $ 183,647.25  +  37% of the amount over $ 609,350.00   |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  
 */

// Helper functions for common tax calculations
function calculateMichiganTax(income) {
    return income * 0.0425; // Michigan state tax rate
}

function calculateOASDITax(income, oasdiLimit = 168600) {
    return income <= oasdiLimit ? income * 0.062 : oasdiLimit * 0.062;
}

function calculateMedicareTax(income, medicareThreshold = 200000) {
    const baseMedicareTax = income * 0.0145; // Base Medicare tax rate
    const additionalMedicareTax = income > medicareThreshold ? (income - medicareThreshold) * 0.009 : 0;
    return baseMedicareTax + additionalMedicareTax;
}

function calculateNetIncome(income, federalTax, stateTax, oasdiTax, medicareTax) {
    return income - (federalTax + stateTax + oasdiTax + medicareTax);
}

// Main function for Filing Single
function filingSingle() {
    const taxBrackets = [
        { rate: 0.10, min: 0, max: 11600, baseTax: 0 },
        { rate: 0.12, min: 11601, max: 47150, baseTax: 1160 },
        { rate: 0.22, min: 47151, max: 100525, baseTax: 5426 },
        { rate: 0.24, min: 100526, max: 191950, baseTax: 17168.50 },
        { rate: 0.32, min: 191951, max: 243725, baseTax: 39110.50 },
        { rate: 0.35, min: 243726, max: 609350, baseTax: 55678.50 },
        { rate: 0.37, min: 609351, max: Infinity, baseTax: 183647.25 }
    ];

    let income = parseFloat(document.getElementById("singleIncome").value);

    if (isNaN(income) || income < 0) {
        alert("Please enter a valid income.");
        return;
    }

    // Calculate federal tax
    let federalTax = 0;
    for (const bracket of taxBrackets) {
        if (income >= bracket.min && income <= bracket.max) {
            federalTax = bracket.baseTax + ((income - bracket.min) * bracket.rate);
            alert(`You are in the ${Math.round(bracket.rate * 100)}% Tax Bracket!`);
            console.log(`You Owe: ${federalTax.toFixed(2)} in Federal Income Tax.`);
            break;
        }
    }

    // Calculate other taxes
    const stateTaxMI = calculateMichiganTax(income);
    console.log(`You Owe: ${stateTaxMI.toFixed(2)} in State Income Tax (Michigan).`);

    const oasdiTax = calculateOASDITax(income);
    console.log(`You Owe: ${oasdiTax.toFixed(2)} in OASDI Tax.`);

    const medicareTax = calculateMedicareTax(income);
    console.log(`You Owe: ${medicareTax.toFixed(2)} in Medicare Tax.`);

    // Calculate net income
    const netIncome = calculateNetIncome(income, federalTax, stateTaxMI, oasdiTax, medicareTax);
    console.log(`Your Net Income is: ${netIncome.toFixed(2)}.`);

    const monthlyNetIncome = netIncome / 12;
    console.log(`Your Monthly Net Income is: ${monthlyNetIncome.toFixed(2)}.`);
}


/**
 *  2024 Federal Income Tax Brackets
 *  Married, Filing Jointly
 * 
 *  |-----------|------------------------------------|----------------------------------------------------------|
 *  | Tax Rate  |   Taxable Income Bracket           |   Tax Owed                                               |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  |    10%    |               up to $  23,200.00   |                    10% of taxable income                 |
 *  |    12%    |   $  23,201.00  to  $  94,300.00   |   $   2,320.00  +  12% of the amount over $  23,200.00   |
 *  |    22%    |   $  94,301.00  to  $ 201,050.00   |   $  10,852.00  +  22% of the amount over $  94,300.00   |
 *  |    24%    |   $ 201,051.00  to  $ 383,900.00   |   $  34,337.00  +  24% of the amount over $ 201,050.00   |
 *  |    32%    |   $ 383,901.00  to  $ 487,450.00   |   $  78,221.00  +  32% of the amount over $ 383,900.00   |
 *  |    35%    |   $ 487,451.00  to  $ 731,200.00   |   $ 111,357.00  +  35% of the amount over $ 487,450.00   |
 *  |    37%    |   $ 731,201.00 or more             |   $ 196,667.50  +  37% of the amount over $ 731,200.00   |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  
 */

function filingMarriedJoint() {
    const taxBrackets = [
        { rate: 0.10, min: 0, max: 23200, baseTax: 0 },
        { rate: 0.12, min: 23201, max: 94300, baseTax: 2320 },
        { rate: 0.22, min: 94301, max: 201050, baseTax: 10852 },
        { rate: 0.24, min: 201051, max: 383900, baseTax: 34337 },
        { rate: 0.32, min: 383901, max: 487450, baseTax: 78221 },
        { rate: 0.35, min: 487451, max: 731200, baseTax: 111357 },
        { rate: 0.37, min: 731201, max: Infinity, baseTax: 196669.50 }
    ];

    let income = parseFloat(document.getElementById("marriedJointIncome").value);

    if (isNaN(income) || income < 0) {
        alert("Please enter a valid income.");
        return;
    }

    for (const bracket of taxBrackets) {
        if (income >= bracket.min && income <= bracket.max) {
            const taxOwed = bracket.baseTax + ((income - bracket.min) * bracket.rate);
            alert(`You are in the ${Math.round(bracket.rate * 100)}% Tax Bracket!`);
            console.log(`You Owe: ${taxOwed.toFixed(2)} in Federal Income Tax.`);
            return;
        }
    }
}

/**
 *  2024 Federal Income Tax Brackets
 *  Married, Filing Separately
 * 
 *  |-----------|------------------------------------|----------------------------------------------------------|
 *  | Tax Rate  |   Taxable Income Bracket           |   Tax Owed                                               |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  |    10%    |               up to $  11,600.00   |                    10% of taxable income                 |
 *  |    12%    |   $  11,601.00  to  $  47,150.00   |   $   1,160.00  +  12% of the amount over $  11,600.00   |
 *  |    22%    |   $  47,151.00  to  $ 100,525.00   |   $   5,426.00  +  22% of the amount over $  47,150.00   |
 *  |    24%    |   $ 100,526.00  to  $ 191,950.00   |   $  17,168.50  +  24% of the amount over $ 100,525.00   |
 *  |    32%    |   $ 191,951.00  to  $ 243,725.00   |   $  39,110.50  +  32% of the amount over $ 191,950.00   |
 *  |    35%    |   $ 243,726.00  to  $ 365,600.00   |   $  55,678.50  +  35% of the amount over $ 243,725.00   |
 *  |    37%    |   $ 365,601.00 or more             |   $  98,334.75  +  37% of the amount over $ 365,600.00   |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  
 */

function filingMarriedSeparate() {
    const taxBrackets = [
        { rate: 0.10, min: 0, max: 11600, baseTax: 0 },
        { rate: 0.12, min: 11601, max: 47150, baseTax: 1160 },
        { rate: 0.22, min: 47151, max: 100525, baseTax: 5426 },
        { rate: 0.24, min: 100526, max: 191950, baseTax: 17168.50 },
        { rate: 0.32, min: 191951, max: 243725, baseTax: 39110.50 },
        { rate: 0.35, min: 243726, max: 365600, baseTax: 55678.50 },
        { rate: 0.37, min: 365601, max: Infinity, baseTax: 98334.75 }
    ];

    let income = parseFloat(document.getElementById("marriedSeparateIncome").value);

    if (isNaN(income) || income < 0) {
        alert("Please enter a valid income.");
        return;
    }

    for (const bracket of taxBrackets) {
        if (income >= bracket.min && income <= bracket.max) {
            const taxOwed = bracket.baseTax + ((income - bracket.min) * bracket.rate);
            alert(`You are in the ${Math.round(bracket.rate * 100)}% Tax Bracket!`);
            console.log(`You Owe: ${taxOwed.toFixed(2)} in Federal Income Tax.`);
            return;
        }
    }
}

/**
 *  2024 Federal Income Tax Brackets
 *  Head of Household
 * 
 *  |-----------|------------------------------------|----------------------------------------------------------|
 *  | Tax Rate  |   Taxable Income Bracket           |   Tax Owed                                               |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  |    10%    |               up to $  16,550.00   |                    10% of taxable income                 |
 *  |    12%    |   $  16,551.00  to  $  63,100.00   |   $   1,655.00  +  12% of the amount over $  16,550.00   |
 *  |    22%    |   $  63,101.00  to  $ 100,500.00   |   $   7,241.00  +  22% of the amount over $  63,100.00   |
 *  |    24%    |   $ 100,501.00  to  $ 191,950.00   |   $  15,469.00  +  24% of the amount over $ 100,500.00   |
 *  |    32%    |   $ 191,951.00  to  $ 243,700.00   |   $  37,417.00  +  32% of the amount over $ 191,950.00   |
 *  |    35%    |   $ 243,701.00  to  $ 609,350.00   |   $  53,977.00  +  35% of the amount over $ 243,700.00   |
 *  |    37%    |   $ 609,351.00 or more             |   $ 181,954.50  +  37% of the amount over $ 609,350.00   |
 *  |-----------|------------------------------------|----------------------------------------------------------| 
 *  
 */

function filingHeadOfHousehold() {
    const taxBrackets = [
        { rate: 0.10, min: 0, max: 16550, baseTax: 0 },
        { rate: 0.12, min: 16551, max: 63100, baseTax: 1655 },
        { rate: 0.22, min: 63101, max: 100500, baseTax: 7241 },
        { rate: 0.24, min: 100501, max: 191950, baseTax: 15469 },
        { rate: 0.32, min: 191951, max: 243700, baseTax: 37417 },
        { rate: 0.35, min: 243701, max: 609350, baseTax: 53977 },
        { rate: 0.37, min: 609351, max: Infinity, baseTax: 181954.50 }
    ];

    let income = parseFloat(document.getElementById("headOfHouseholdIncome").value);

    if (isNaN(income) || income < 0) {
        alert("Please enter a valid income.");
        return;
    }

    for (const bracket of taxBrackets) {
        if (income >= bracket.min && income <= bracket.max) {
            const taxOwed = bracket.baseTax + ((income - bracket.min) * bracket.rate);
            alert(`You are in the ${Math.round(bracket.rate * 100)}% Tax Bracket!`);
            console.log(`You Owe: ${taxOwed.toFixed(2)} in Federal Income Tax.`);
            return;
        }
    }
}
