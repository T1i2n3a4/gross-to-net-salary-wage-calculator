document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("user-wage-input").focus();
    let buttons = document.getElementsByTagName("button");

    for (let button of buttons) {
        button.addEventListener("click", function() {
            if (this.getAttribute("data-type")==="calculate") {
                alert("You clicked Calculate!");
            } else {
                alert("You clicked modal!")
            }
        })
    }
})

let detailsForm = document.getElementById('details-form')
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    
}

function calculateUserAnnualGrossWage() {
    
    let userWageInput = document.getElementById("user-wage-input").value;
    let userPeriodSelected = document.getElementById("user-selected-period").value;
    let monthToYear = userWageInput * 12;
    let fortnightToYear = userWageInput / 2 * 52;
    let 
        if (userPeriodSelected === "month") {
            monthToYear = userAnnualGrossWage;
        
    return userAnnualGrossWage;
           
        } else if (userPeriodSelected === "fortnight") {
            let annualGrossWage = yourWageInput / 2 * 52;
        } else if (userPeriodSelected === "week") {
            let annualGrossWage = yourWageInput * 52;
        } else if (userPeriodSelected === "day") {
            let annualGrossWage = yourWageInput * 5 * 52;
        }
        else {
           let annualGrossWage = yourWageInput * workingHoursInput * 52;
        }
        return annualGrossWage;
    }
// document.getElementById("gross-wage-result").innerHTML = annualGrossWage;
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

function calculateAnnualNetWage(){

}

function display() {

}
