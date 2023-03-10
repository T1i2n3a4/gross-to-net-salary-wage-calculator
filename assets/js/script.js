document.addEventListener("DOMContentLoaded", function() {
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

function calculateAnnualGrossWage() {
    let annualGrossWage;
    let yourWageInput = document.getElementById("your-wage-input").value;
    let periodSelected = document.getElementById("period-your").value;
        if (periodSelected === "year") {
        let annualGrossWage = yourWageInput;
        } else if (periodSelected === "month") {
            let annualGrossWage = yourWageInput * 12;
        } else if (periodSelected === "fortnight") {
            let annualGrossWage = yourWageInput / 2 * 52;
        } else if (periodSelected === "week") {
            let annualGrossWage = yourWageInput * 52;
        } else if (periodSelected === "day") {
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
