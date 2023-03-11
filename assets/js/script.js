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
    console.log(`Spouse's annual gross wage is ${spouseAnnualGrossWage}`)

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
    }
    else {
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


function calculateAnnualPaye() {
    let annualGrossWage = calculateAnnualGrossWage();


}

function calculateAnnualUsc() {
    let annualGrossWage = calculateAnnualGrossWage();
}

function calculateAnnualPrsi() {
    let annualGrossWage = calculateAnnualGrossWage();
    let annualPrsi = annualGrossWage * 4 / 100;
}

function calculateAnnualTotalTax() {

}

function calculateAnnualNetWage() {

}

function display() {

}