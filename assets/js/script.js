// document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-wage-input").focus();

let detailsForm = document.getElementById('details-form');
detailsForm.addEventListener('submit', handleSubmit);

let annualResults = [];

function handleSubmit(event) {
    console.log("Calculate Runs");
    event.preventDefault();
    
    console.log(`User's annual gross wage is ${annualGrossWage()}`);
    console.log(`Spouse's annual gross wage is ${spouseAnnualGrossWage()}`);
    console.log(`Higher income is ${getHigherIncome()}`);
    console.log(`Lower income is ${lowerIncome()}`);
    console.log(`Higher income tax at rate1 is ${higherIncomeTaxRate1()}`);
    console.log(`Lower income tax at rate1 is ${lowerIncomeTaxRate1()}`);
    console.log(`Higher income tax at rate2 is ${higherIncomeTaxRate2()}`);
    console.log(`Lower income tax at rate2 is ${lowerIncomeTaxRate2()}`);
    console.log(`Annual gross tax is ${grossTax()}`);
    console.log(`Annual PAYE is ${annualPaye()}`);
    console.log(`Annual USC is ${annualUsc()}`);
    console.log(`User's annual annual PRSI is ${annualPrsi()}`);
    console.log(`Annual total tax is ${annualTotalTax()}`);
    console.log(`User's annual NET WAGE/SALARY is ${annualNetWage()}`);
    console.log(annualResults);
    
    let userAnnualNetWage = annualNetWage();
    let userAnnualGrossWage = annualGrossWage();
    let userAnnualPaye = annualPaye();
    let userAnnualUsc = annualUsc();
    let userAnnualPrsi = annualPrsi();
    let userAnnualTotalTax = annualTotalTax();
    annualResults.push(userAnnualNetWage, userAnnualGrossWage, userAnnualPaye, userAnnualUsc, userAnnualPrsi, userAnnualTotalTax);
    let monthlyResults = getMonthlyResults(annualResults);
    let fortnightlyResults = getFortnightlyResults(annualResults);
    let weeklyResults = getWeeklyResults(annualResults);
    let dailyResults = getDailyResults(annualResults);
    let hourlyResults = getHourlyResults(annualResults);
    
    console.log(monthlyResults);
    console.log(fortnightlyResults);
    console.log(weeklyResults);
    console.log(dailyResults);
    console.log(hourlyResults);
    
    

    let yearSelected = displayAnnualResult();
    let monthSelected = displayMonthlyResult();
    let fortnightSelected = displayFortnightlyResult();
    let weekSelected = displayWeeklyResult();
    let daySelected = displayDailyResult();
    let hourSelected = displayHourlyResult();

    

    display();
    
}

// document.getElementById("gross-wage-result").innerHTML = annualGrossWage;


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


/**Calculates the annual income tax 
 * reduced by tax credits
 */
function totalAnnualPaye() {
    let taxCredits = document.getElementById("tax-credits").value;
    return grossTax() - taxCredits;
}

function annualPaye() {
    
    let jointWage = annualGrossWage() + spouseAnnualGrossWage();
    return totalAnnualPaye() * (annualGrossWage() / jointWage);

}

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
        newArray[i] = array[i] / 12;
    }
    return newArray;
}

function getFortnightlyResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i] / 52 * 2;
    }
    return newArray;
}

function getWeeklyResults(array) {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i] / 52;
    }
    return newArray;
}

function getDailyResults(array) {
    let workingDaysPerWeek = document.getElementById('user-working-ds-weekly').value;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i] / 52 /workingDaysPerWeek;
    }
    return newArray;
}

function getHourlyResults(array) {
    let workingHsPerWeek = document.getElementById('user-working-hs-weekly').value;
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
        newArray[i] = array[i] / 52 / workingHsPerWeek;
    }
    return newArray;
}

/**Displays calculator results
 * in the table 2nd column
 */
function displayAnnualResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < annualResults.length; i++) {
        resultColumn[i + 1].innerHTML = annualResults[i];
    }
}

/**Displays calculator results
 * in the table 2nd column for month period
 */


function displayFortnightlyResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < fortnightlyResults.length; i++) {
        resultColumn[i + 1].innerHTML = fortnightlyResults[i];
    }
}

function displayWeeklyResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < weeklyResults.length; i++) {
        resultColumn[i + 1].innerHTML = weeklyResults[i];
    }
}

function displayDailyResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < dailyResults.length; i++) {
        resultColumn[i + 1].innerHTML = dailyResults[i];
    }
}

function displayHourlyResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < hourlyResults.length; i++) {
        resultColumn[i + 1].innerHTML = hourlyResults[i];
    }
}

function displayMonthlyResult() {
    
    let resultColumn = document.getElementsByTagName('td');
    for (i = 0; i < monthlyResults.length; i++) {
        resultColumn[i + 1].innerHTML = monthlyResults[i];
    }
}

function display() {
    let resultPeriod = document.getElementById("period-result").value;
    if (resultPeriod === "month") {
        return monthSelected;
    } else if (resultPeriod === "fortnight") {
        return fortnightSelected;
    } else if (resultPeriod === "week") {
        return weekSelected;
    } else if (resultPeriod === "day") {
        return daySelected;
    } else if (resultPeriod === "hour") {
        return hourSelected;
    } else {
        return yearSelected;
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
btn.onclick = function () {
    modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

