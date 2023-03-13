// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("user-wage-input").focus();

let detailsForm = document.getElementById('details-form');
detailsForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    console.log("Calculate Runs");
    event.preventDefault();
    const userAnnualGrossWage = calculateUserAnnualGrossWage();
    console.log(`User's annual gross wage is ${userAnnualGrossWage}`);
    const spouseAnnualGrossWage = calculateSpouseAnnualGrossWage();
    console.log(`Spouse's annual gross wage is ${spouseAnnualGrossWage}`);
    console.log(`Higher income is ${getHigherIncome()}`);
    console.log(`Lower income is ${lowerIncome()}`);
    console.log(`Higher income tax at rate1 is ${higherIncomeTaxRate1()}`);
    console.log(`Lower income tax at rate1 is ${lowerIncomeTaxRate1()}`);
    console.log(`Higher income tax at rate2 is ${higherIncomeTaxRate2()}`);
    console.log(`Lower income tax at rate2 is ${lowerIncomeTaxRate2()}`);
    console.log(`Annual gross tax is ${grossTax()}`);
    console.log(`Annual PAYE is ${annualPaye()}`);
    console.log(`Annual USC is ${annualUsc()}`);
    const prsi = calculateUserAnnualPrsi();
    console.log(`User's annual annual PRSI is ${prsi}`);

}
// document.getElementById("gross-wage-result").innerHTML = annualGrossWage;
// document.getElementById("gross-wage-result").innerHTML = userWageInput * 12;

/**
 * Calculates users's annual gross wage 
 * in dependence of which period was selected 
 */
function calculateUserAnnualGrossWage() {

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
function calculateSpouseAnnualGrossWage() {

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
    return calculateUserAnnualGrossWage() >= calculateSpouseAnnualGrossWage() ? calculateUserAnnualGrossWage() : calculateSpouseAnnualGrossWage();
}

const taxRate1 = 20 / 100;
const taxRate2 = 40 / 100;
let coupleBand1 = 49000;
let bandIncrease = 31000;
const coupleBand2 = 80000;
let taxBand1 = document.getElementById("first-tax-band").value;

/**
 * Calculates the tax at rate1 for the higher income 
 */
function higherIncomeTaxRate1() {
    const taxRate1 = 20 / 100;
    let coupleBand1 = 49000;
    let bandIncrease = 31000;
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
 */
function lowerIncome() {
    return calculateUserAnnualGrossWage() >= calculateSpouseAnnualGrossWage() ? calculateSpouseAnnualGrossWage() : calculateUserAnnualGrossWage();
}

function lowerIncomeTaxRate1() {
    return lowerIncome() <= bandIncrease ? lowerIncome() * taxRate1 : bandIncrease * taxRate1;
}

/**
 * Calculates higher income tax at rate 2
 * using tax band 1 input, tax bands for couples.
 */
function higherIncomeTaxRate2() {
    const taxRate1 = 20 / 100;
    const taxRate2 = 40 / 100;
    let coupleBand1 = 49000;
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
    return lowerIncome() > bandIncrease ? (lowerIncome - bandIncrease) * taxRate2 : 0;
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

function annualPaye() {
    let taxCredits = document.getElementById("tax-credits").value;
    return grossTax() - taxCredits;
}


function annualUsc() {
    let uscRates = {
        rate1 : 0.5 / 100,
        rate2 : 2 / 100,
        rate3 : 4.5 / 100,
        rate4 : 8 / 100
    }
    let uscBands = {
        band0 : 13000,
        band1 : 12012,
        band2 : 10908,
        band3 : 47124,
    };

    let band4 = calculateUserAnnualGrossWage() - (uscBands.band1 + uscBands.band2 + uscBands.band3)

    if (calculateUserAnnualGrossWage() <= uscBands.band0) {
        return 0;
    } else if (calculateUserAnnualGrossWage() <= uscBands.band1 + uscBands.band2) {
        return uscBands.band1 * uscRates.rate1 + (calculateUserAnnualGrossWage() - uscBands.band1) * uscRates.rate2;
    } else if (calculateUserAnnualGrossWage() <= uscBands.band1 + uscBands.band2 + uscBands.band3) {
        return uscBands.band1 * uscRates.rate1 + uscBands.band2 * uscRates.rate2 + (calculateUserAnnualGrossWage() - (uscBands.band1 + uscBands.band2)) * uscRates.rate3;
    } else
        return uscBands.band1 * uscRates.rate1 + uscBands.band2 * uscRates.rate2 + uscBands.band3 * uscRates.rate3 + uscBands.band4 * uscRates.rate4;
}

/**
 * Calculates user's annual PRSI
 * by using the PRSI rate of 4%
 */
function calculateUserAnnualPrsi() {

    const prsiRate = 4;
    return calculateUserAnnualGrossWage() * prsiRate / 100;

}

function calculateAnnualTotalTax() {

}

function calculateAnnualNetWage() {

}

function display() {

}