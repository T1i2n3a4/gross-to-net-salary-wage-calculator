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


function calculateAnnualGrossWage() {

}

function calculateAnnualPaye() {

}

function calculateAnnualUsc() {

} 

function calculateAnnualPrsi() {

}

function calculateAnnualTotalTax() {

}

function calculateAnnualNetWage(){

}

function display() {

}
