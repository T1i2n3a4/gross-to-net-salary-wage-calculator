// document.addEventListener("DOMContentLoaded", function() {
//     document.getElementById("user-wage-input").focus();

let detailsForm = document.getElementById('details-form')
detailsForm.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    console.log("Calculate Runs");
    event.preventDefault();
    const userAnnualGrossWage = calculateUserAnnualGrossWage();
    console.log(`User's annual gross wage is ${userAnnualGrossWage}`);
    const spouseAnnualGrossWage = calculateSpouseAnnualGrossWage();
    console.log(`Spouse's annual gross wage is ${spouseAnnualGrossWage}`);
    console.log(`Higher income is ${getHigherIncome()}`);
    console.log(`Higher income tax at rate1 is ${higherIncomeTaxRate1()}`);
    console.log(`Lower income tax at rate1 is ${lowerIncomeTaxRate1()}`);
    const prsi = calculateUserAnnualPrsi();
    console.log(`User's annual annual PRSI is ${prsi}`);
    console.log(`Lower income is ${lowerIncome()}`)
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
        taxBand1 * taxRate1;
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

function calculateAnnualPaye() {

    const taxRate2 = 40 / 100;
}


function calculateAnnualUsc() {
    let annualGrossWage = calculateAnnualGrossWage();
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