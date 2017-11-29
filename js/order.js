//function toggleField(elementId) {
// $("#" + elementId).removeClass("hidden");
//}

//document.getElementById("pizza-size")
//    .addEventListener('change', function()){
//    console.log(document.getElementById("crust-type-container"));
//});

$(document).ready(function($){

    $("#pizza-size").on("change", function(e){
        $("#crust-type-container").removeClass("hidden");
    });

    $("#crust-type").on("change", function(e){
        $(".toppings-container").each(function(){
            $(this).removeClass("hidden");
        });
    });

    $(".pizza-updater").on("change", function(e){
        var fieldName = $(this).attr('name');
        pizzaOrder[fieldName] = $(this).val();
        var price = $(this).find(':selected').data('price');
        pizzaOrder.price[fieldName] = price;
        saveOrder(pizzaOrder);
        updatePrice(pizzaOrder);
    });

    $(".pizza-topping-updater").on("change", function(e){
        var fieldName = $(this).attr('name');
        pizzaOrder.toppings[fieldName] = this.checked;
        var price = $(this).data('price');
        if(this.checked) {
            pizzaOrder.price.toppings[fieldName] = price;
        } else {
            pizzaOrder.price.toppings[fieldName] = 0;
        }
        saveOrder(pizzaOrder);
        updatePrice(pizzaOrder);
    });

    var pizzaOrder = getOrder();
    setOrderDetails(pizzaOrder);

});

function setOrderDetails(pizzaOrder) {
    if(pizzaOrder.size != null) {
        $('#pizza-size').val(pizzaOrder.size);
        $('#pizza-size').change();
    }
    if(pizzaOrder.crust != null) {
        $('#crust-type').val(pizzaOrder.crust);
        $('#crust-type').change();
    }
    document.getElementById('pepperoni').checked = pizzaOrder.toppings.pepperoni;
    document.getElementById('sausage').checked = pizzaOrder.toppings.sausage;
    document.getElementById('anchovies').checked = pizzaOrder.toppings.anchovies;
    document.getElementById('beef').checked = pizzaOrder.toppings.beef;
    document.getElementById('onion').checked = pizzaOrder.toppings.onion;
    document.getElementById('greenpepper').checked = pizzaOrder.toppings.greenpepper;
    document.getElementById('mushroom').checked = pizzaOrder.toppings.mushroom;
    document.getElementById('spinach').checked = pizzaOrder.toppings.spinach;

}

function createOrder() {
    return {
        crust: null,
        size: null,
        toppings: {
            pepperoni: false,
            sausage: false,
            anchovies: false,
            beef: false,
            onion: false,
            greenpepper: false,
            mushroom: false,
            spinach: false
        },
        price: {
            size: 0,
            crust: 0,
            toppings: {
                pepperoni: 0,
                sausage: 0,
                anchovies: 0,
                beef: 0,
                onion: 0,
                greenpepper: 0,
                mushroom: 0,
                spinach: 0
            }
        }
    };
}

function saveOrder(pizzaOrder) {
    localStorage.pizza_order = JSON.stringify(pizzaOrder);
}

function updatePrice(pizzaOrder) {
    var total;
    total = pizzaOrder.price.crust + pizzaOrder.price.size +
        pizzaOrder.price.toppings.pepperoni + pizzaOrder.price.toppings.sausage +
        pizzaOrder.price.toppings.anchovies + pizzaOrder.price.toppings.beef +
        pizzaOrder.price.toppings.onion + pizzaOrder.price.toppings.greenpepper +
        pizzaOrder.price.toppings.mushroom + pizzaOrder.price.toppings.spinach;
    $("#total").text(total);
}

function getOrder() {
    return (localStorage['pizza_order']) ? JSON.parse(localStorage['pizza_order'])
        : createOrder();
}