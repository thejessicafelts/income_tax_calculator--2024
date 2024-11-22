document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("tax-calculator-form");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting and refreshing the page

        // Retrieve form values
        const filingYear = document.getElementById("filing-year").value;
        const filingStatus = document.querySelector("input[name='filing-status']:checked")?.value;
        const filingState = document.getElementById("filing-state").value;
        const incomeNet = document.getElementById("income").value;

        // Validate and log the values
        if (!filingStatus) {
            alert("Please select a filing status.");
            return;
        }

        if (!incomeNet || incomeNet <= 0) {
            alert("Please enter a valid income.");
            return;
        }

        console.log("Filing Year:", filingYear);
        console.log("Filing Status:", filingStatus);
        console.log("Filing State:", filingState);
        console.log("Annual Income:", incomeNet);

        // Assign values to variables (for further use in calculations)
        const taxData = {
            filingYear,
            filingStatus,
            filingState,
            incomeNet: parseFloat(incomeNet),
        };

        // You can now use `taxData` for further processing or calculations
        console.log("Tax Data:", taxData);
    });
});
