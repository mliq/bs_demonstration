function randomNumber(min, max) {
    return Math.floor(Math.random() * (1 + max - min) + min);
}

var Market = {
    apples: randomNumber(50, 999) / 100,
    oranges: randomNumber(50, 999) / 100,
    bananas: randomNumber(50, 999) / 100,
    pears: randomNumber(50, 999) / 100
};

var Person = {
    apples: [],
    oranges: [],
    bananas: [],
    pears: [],
    budget: 50
};

function priceChange(price) {
    price += randomNumber(-25, 25) / 100;
    if (price > 9.99) {
        price = 9.99;
    } else if (price < .50) {
        price = .50;
    }
    price = Math.round(price * 100) / 100;
    return price;
}

function avgArray(array) {
    if (array.length == 0) {
        return 0;
    }
    var sum = array.reduce(function (a, b) {
        return a + b;
    });
    return Math.round((sum / array.length) * 100) / 100;
}

$(document).ready(function () {
    $("#apples").append("Tardigrades <span class='badge'>$<span id='markAp'>" + Market.apples + "</span></span>");
    $("#oranges").append("Narwhals <span class='badge'>$<span id='markOr'>" + Market.oranges + "</span></span>");
    $("#bananas").append("Giant Squids <span class='badge'>$<span id='markBa'>" + Market.bananas + "</span></span>");
    $("#pears").append("Pudus <span class='badge'>$<span id='markPe'>" + Market.pears + "</span></span>");
    $("#userInfo").append("<h3><p>Budget: " + Person.budget + "</p><div class='progress'><span class='progress-value'>|</span><div class='progress-bar progress-bar-success' style='width: 50%'></div></div></h3>");

    setInterval(function () {
        for (var fruit in Market) {
            Market[fruit] = priceChange(Market[fruit]);
        }

        $("#markAp").html(Market.apples);
        $("#markOr").html(Market.oranges);
        $("#markBa").html(Market.bananas);
        $("#markPe").html(Market.pears);
    }, 15000);

    $(".myBtn").on("click", function () {
        if (Person.budget - Market[this.id] < 0) {
            alert("Insufficient funds");
        } else {
            Person[this.id].push(Market[this.id]);
            Person.budget -= Market[this.id];
            Person.budget = Math.round(Person.budget * 100) / 100;
            $("#userInfo").html("<h3><p>Budget: $" + Person.budget + "</p>"
                + "<div class='progress'><span class='progress-value'>|</span><div class='progress-bar progress-bar-success' style='width: " + ((Person.budget / 50)*50) + "%'></div>                </div></h3><h4><p>Tardigrades: " + Person.apples.length + " at an average price of $" + avgArray(Person.apples) + "</p>" + "<p>Narwhals: " + Person.oranges.length + " at an average price of $" + avgArray(Person.oranges) + "</p>" + "<p>Giant Squids: " + Person.bananas.length + " at an average price of $" + avgArray(Person.bananas) + "</p>" + "<p>Pudus:" + Person.pears.length + " at an average price of $" + avgArray(Person.pears) + "</p></h4>");
        }
    });
    $(".sellBtn").on("click", function () {
        var fruit = this.id.slice(4);
        if (Person[fruit] < 1) {
            alert("No " + fruit + " to sell!");
        } else {
            Person[fruit].shift();
            Person.budget += Market[fruit];
            Person.budget = Math.round(Person.budget * 100) / 100;
            $("#userInfo").html("<h3><p>Budget: $" + Person.budget + "</p>"
                + "<div class='progress'><span class='progress-value'>|</span><div class='progress-bar progress-bar-success' style='width: " + ((Person.budget / 50)*50) + "%'></div>                </div></h3><h4><p>Tardigrades: " + Person.apples.length + " at an average price of $" + avgArray(Person.apples) + "</p>" + "<p>Narwhals: " + Person.oranges.length + " at an average price of $" + avgArray(Person.oranges) + "</p>" + "<p>Giant Squids: " + Person.bananas.length + " at an average price of $" + avgArray(Person.bananas) + "</p>" + "<p>Pudus: " + Person.pears.length + " at an average price of $" + avgArray(Person.pears) + "</p></h3>");
        }
    });
});