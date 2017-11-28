//function toggleField(elementId) {
   // $("#" + elementId).removeClass("hidden");
//}

//document.getElementById("pizza-size")
//    .addEventListener('change', function()){
//    console.log(document.getElementById("crust-type-container"));
//});

$(document).ready(function($){
    var pizzaOrder = getOrder();



    $("#pizza-size").on("change", function(e){
        $("#crust-type-container").removeClass("hidden");
    });

    $("#crust-type").on("change", function(e){
        $(".toppings-container").each(function(){
            $(this).removeClass("hidden");
        });
    });

    $("#pizza-updater").on("change", function(e){
        let fieldName = $(this).attr('name');
        pizzaOrder[fieldName] = $(this).val();
        saveOrder(pizzaOrder);
    });
});

function createOrder() {
    return {
        crust: null,
        size: null,
        toppingsMeat: [],
        toppingsMisc: []
    };
}

function saveOrder(pizzaOrder) {
    localStorage.pizza_order = JSON.stringify(pizzaOrder);
}

function getOrder() {
    return (localStorage['pizza_order'])
        ? JSON.parse(localStorage['pizza_order'])
        : createOrder();
}