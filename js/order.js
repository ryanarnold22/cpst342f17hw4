//function toggleField(elementId) {
   // $("#" + elementId).removeClass("hidden");
//}

//document.getElementById("pizza-size")
//    .addEventListener('change', function()){
//    console.log(document.getElementById("crust-type-container"));
//});

$(document).ready(function($){
    var pizzaOrder = getOrder();

    if (localStorage['pizza_order']) {
        pizzaOrder = JSON.parse(localStorage['pizza_order']);
    } else {
        pizzaOrder = {
            crust: null,
            size: null,
            toppingsMeat: [],
            toppingsVeggie: []
        };
        localStorage.pizza_order = JSON.stringify(pizzaOrder);
    }

    $("#pizza-size").on("change", function(e){
        $("#crust-type-container").removeClass("hidden");
    });

    $("#crust-type").on("change", function(e){
        $(".toppings-container").each(function(){
            $(this).removeClass("hidden");

        });
    });

    $("#pizza-updater").on("change", function(e){
        var fieldName = $(this).attr('name');
        pizzaOrder[fieldName] = $(this).val();
        saveOrder(pizzaOrder);
    });
});

function createOrder() {
    return {
        crust: null,
        size: null,
        toppingsMeat: [],
        toppingsVeggie: []
    };
}

function saveOrder(pizzaOrder) {
    localStorage.pizza_order = JSON.stringify(pizzaOrder);
}

function getOrder() {
    return (localStorage['pizza_order']) ? JSON.parse(localStorage['pizza_order'])
        : createOrder();
}
