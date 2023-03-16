document.getElementById("user-wage-input").focus();

let detailsForm = document.getElementById('details-form');
detailsForm.addEventListener('submit', handleSubmit);

let annualResults = [];

let monthlyResults;
let fortnightlyResults;
let weeklyResults;
let dailyResults;
let hourlyResults;

let taxCredits;

function handleSubmit(event) {
    event.preventDefault();

    let userAnnualNetWage = annualNetWage();
    let userAnnualGrossWage = Number(annualGrossWage());
    let userAnnualTotalTax = annualTotalTax();
   
    annualResults.push(userAnnualGrossWage, userAnnualTotalTax, userAnnualNetWage);
    monthlyResults = getMonthlyResults(annualResults);
    fortnightlyResults = getFortnightlyResults(annualResults);
    weeklyResults = getWeeklyResults(annualResults);
    dailyResults = getDailyResults(annualResults);
    hourlyResults = getHourlyResults(annualResults);
        
    taxCredits = annualTaxCredits();
    
    let resetButton = document.getElementById('reset-button');
    resetButton.addEventListener('click', reload);
    function reload() {
        window.location.reload();
    }
    
    displayAnnualResult();
    displayMonthlyResult();
    displayFortnightlyResult();
    displayWeeklyResult();
    displayDailyResult();
    displayHourlyResult();
    document.getElementById('calculate-button').disabled = true;
}

/**
 * Calculates users's annual gross wage 
 * in dependence of which period was selected 
 */
function annualGrossWage() {

    let userWageInput = document.getElementById("user-wage-input").value;
    let userPeriodSelected = document.getElementById("user-selected-period").value;
    if (userPeriodSelected === "month") {
        document.getElementById("gross-wage-result").innerHTML = userWageInput * 12;
        return userWageInput * 12;
    } else if (userPeriodSelected === "fortnight") {
        return userWageInput / 2 * 52;
    } else if (userPeriodSelected === "week") {
        return userWageInput * 52;
    } else if (userPeriodSelected === "day") {
        return userWageInput * 5 * 52;
    } else if (userPeriodSelected === "hour") {
        return userWageInput * document.getElementById("user-working-hs-weekly").value * 52;
    } else {
        return userWageInput;
    }
}

/**
 * Calculates spouse annual gross wage 
 * in dependence of which period was selected 
 */
function spouseAnnualGrossWage() {

    let spouseWageInput = document.getElementById("spouse-wage-input").value;
    let spousePeriodSelected = document.getElementById("spouse-period-selected").value;
    if (spousePeriodSelected === "month") {
        return spouseWageInput * 12;
    } else if (spousePeriodSelected === "fortnight") {
        return spouseWageInput / 2 * 52;
    } else if (spousePeriodSelected === "week") {
        return spouseWageInput * 52;
    } else if (spousePeriodSelected === "day") {
        return spouseWageInput * 5 * 52;
    } else if (spousePeriodSelected === "hour") {
        return spouseWageInput * document.getElementById("user-working-hs-weekly").value * 52;
    } else {
        return spouseWageInput;
    }
}

/**
 * 
 * Gets the higher income between spouses
 */
function getHigherIncome() {
    return annualGrossWage() >= spouseAnnualGrossWage() ? annualGrossWage() : spouseAnnualGrossWage();
}

/**
 * Calculates the income tax at 20% rate
 * for the higher income 
 */
function higherIncomeTaxRate1() {
    const taxRate1 = 20 / 100;
    const coupleBand1 = 49000;
    const coupleBand2 = 80000;
    let taxBand1 = document.getElementById("first-tax-band").value;
    if (taxBand1 >= coupleBand2) {
        if (getHigherIncome() <= coupleBand1) {
            return getHigherIncome() * taxRate1;
        } else {
            return coupleBand1 * taxRate1;
        }
    } else if (getHigherIncome() <= taxBand1) {
        return getHigherIncome() * taxRate1;
    } else {
        return taxBand1 * taxRate1;
    }
}

/**
 * Gets the lower income
 * of user's and spuse's income 
 */
function lowerIncome() {
    return spouseAnnualGrossWage() <= annualGrossWage() ? spouseAnnualGrossWage() : annualGrossWage();
}

function lowerIncomeTaxRate1() {
    const taxRate1 = 20 / 100;
    const bandIncrease = 31000;
    return lowerIncome() <= bandIncrease ? lowerIncome() * taxRate1 : bandIncrease * taxRate1;
}

/**
 * Calculates higher income tax at rate 2 of 40%
 * using tax band 1 input and tax bands for couples.
 */
function higherIncomeTaxRate2() {

    const taxRate2 = 40 / 100;
    const coupleBand1 = 49000;
    const coupleBand2 = 80000;
    let taxBand1 = document.getElementById("first-tax-band").value;
    if (taxBand1 >= coupleBand2 && getHigherIncome() > coupleBand1) {
        return (getHigherIncome() - coupleBand1) * taxRate2;
    } else if (taxBand1 < getHigherIncome()) {
        return (getHigherIncome() - taxBand1) * taxRate2;
    } else {
        return 0;
    }
}

function lowerIncomeTaxRate2() {
    const bandIncrease = 31000;
    const taxRate2 = 40 / 100;
    return lowerIncome() > bandIncrease ? (lowerIncome() - bandIncrease) * taxRate2 : 0;
}

/**
 * Calculates gross tax
 * getting sum of previously calculated taxes 
 * for higher and lower incomes 
 * at 2 rates
 */
function grossTax() {
    
    let totalGrossTax = [
        higherIncomeTaxRate1(),
        higherIncomeTaxRate2(),
        lowerIncomeTaxRate1(),
        lowerIncomeTaxRate2(),
    ];
    let sum = 0;
    for (i = 0; i < totalGrossTax.length; i += 1) {
        sum += totalGrossTax[i];
    }
    return sum;
   }

/**Returns annual tax credits 
 * for 3 situations:
 * 1) if the user enters the tax credits in the form field = considered single assessed;
 * 2) if tax credits and spouse wage are missing in the input fields = considered joint assessed;
 * 3) if tax credits are missing, houever the spouse income is entered = personalized assessement.
*/
function annualTaxCredits() {
    let taxCreditsInput = Number(document.getElementById("tax-credits").value);
    let singlePersonTaxCredit = 1775;
    let employeeTaxCredit = 1775;
    let marriedPersonTaxCredit = 3550;
    let spouseWageInput = Number(document.getElementById("spouse-wage-input").value);
    if (taxCreditsInput === 0 && spouseWageInput === 0) {
        return singlePersonTaxCredit + employeeTaxCredit;
    } else if (taxCreditsInput === 0 && spouseWageInput !== 0) {
        return marriedPersonTaxCredit + employeeTaxCredit * 2;
    } else {
        return taxCreditsInput;
    }
}

/**Calculates the annual income tax 
 * reduced by tax credits
 */
function annualPaye() {
    let jointSalary = Number(annualGrossWage()) + Number(spouseAnnualGrossWage());
    console.log(jointSalary)
    let totalPaye = grossTax() - annualTaxCredits();
    console.log(grossTax() - annualTaxCredits());
    return totalPaye * annualGrossWage() / jointSalary;
}


// function annualPaye() {
// let getPaye = totalAnnualPaye() * (annualGrossWage() / (annualGrossWage() + spouseAnnualGrossWage()));
// return getPaye * 10;
// }

/**Calculates user's annual USC 
 * using different rates for different thresholds 
 */
function annualUsc() {
    let uscRates = {
        rate1: 0.5 / 100,
        rate2: 2 / 100,
        rate3: 4.5 / 100,
        rate4: 8 / 100
    };
    let uscBands = {
        band0: 13000,
        band1: 12012,
        band2: 10908,
        band3: 47124,
    };

    let band4 = annualGrossWage() - (uscBands.band1 + uscBands.band2 + uscBands.band3);

    if (annualGrossWage() <= uscBands.band0) {
        return 0;
    } else if (annualGrossWage() <= uscBands.band1 + uscBands.band2) {
        return Math.round(uscBands.band1 * uscRates.rate1 + (annualGrossWage() - uscBands.band1) * uscRates.rate2);
    } else if (annualGrossWage() <= uscBands.band1 + uscBands.band2 + uscBands.band3) {
        return Math.round(uscBands.band1 * uscRates.rate1 + uscBands.band2 * uscRates.rate2 + (annualGrossWage() - (uscBands.band1 + uscBands.band2)) * uscRates.rate3);
    } else
        return Math.round(uscBands.band1 * uscRates.rate1 + uscBands.band2 * uscRates.rate2 + uscBands.band3 * uscRates.rate3 + band4 * uscRates.rate4);
}

/**
 * Calculates user's annual PRSI
 * by using the PRSI rate of 4%
 */
function annualPrsi() {

    const prsiRate = 4;
    return Math.round(annualGrossWage() * prsiRate / 100);
}

/**Calculates total annual tax
 * by adding paye, usc and prsi taxes
 */
function annualTotalTax() {
    let totalTax = [
        annualPaye(),
        annualUsc(),
        annualPrsi(),
    ];
    let sum = 0;
    for (i = 0; i < totalTax.length; i += 1) {
        sum += totalTax[i];
    }
    return Math.round(sum);
}

/**Calculates user's annual net wage 
 * reducing annual gross wage by annual total tax
 */
function annualNetWage() {
    return Math.round(annualGrossWage() - annualTotalTax());
}

function getMonthlyResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = Math.round(array[i] / 12);
    }
    return newArray;
}

function getFortnightlyResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = Math.round(array[i] / 52 * 2);
    }
    return newArray;
}

function getWeeklyResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = Math.round(array[i] / 52);
    }
    return newArray;
}

function getDailyResults(array) {
    let workingDaysPerWeek = document.getElementById('user-working-ds-weekly').value;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = Math.round(array[i] / 52 / workingDaysPerWeek);
    }
    return newArray;
}

function getHourlyResults(array) {
    let workingHsPerWeek = document.getElementById('user-working-hs-weekly').value;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = Math.round(array[i] / 52 / workingHsPerWeek);
    }
    return newArray;
}

/**Displays calculator results
 * in the table 
 */
function displayAnnualResult() {

    let annualResultRow = document.getElementsByClassName('annual-result');
    for (i = 0; i < annualResults.length; i++) {
        annualResultRow[i].innerHTML = annualResults[i];
        
    }
}

function displayFortnightlyResult() {

    let fortnightResultRow = document.getElementsByClassName('fortnightly-result');
    for (i = 0; i < fortnightlyResults.length; i++) {
        fortnightResultRow[i].innerHTML = fortnightlyResults[i];
    }
}

function displayWeeklyResult() {

    let weeklyResultRow = document.getElementsByClassName('weekly-result');
    for (i = 0; i < weeklyResults.length; i++) {
        weeklyResultRow[i].innerHTML = weeklyResults[i];
        }
}

function displayDailyResult() {

    let dailyResultRow = document.getElementsByClassName('daily-result');
    for (i = 0; i < dailyResults.length; i++) {
        dailyResultRow[i].innerHTML = dailyResults[i];
    }
}

function displayHourlyResult() {

    let hourlyResultRow = document.getElementsByClassName('hourly-result');
    for (i = 0; i < hourlyResults.length; i++) {
        hourlyResultRow[i].innerHTML = hourlyResults[i];
    }
}

function displayMonthlyResult() {

    let monthlyResultRow = document.getElementsByClassName('monthly-result');
    for (i = 0; i < monthlyResults.length; i++) {
        monthlyResultRow[i].innerHTML = monthlyResults[i];
    }
}


document.getElementById("mouse-over").addEventListener("mouseover", mouseOver);
document.getElementById("mouse-over").addEventListener("mouseout", mouseOut);

function mouseOver() {
    document.getElementById("mouse-over").style.backgroundColor = "lightgray";
}

function mouseOut() {
    document.getElementById("mouse-over").style.backgroundColor = "gray";
}


// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}