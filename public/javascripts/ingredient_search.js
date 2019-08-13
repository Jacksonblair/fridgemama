var mainContainer = document.getElementById("maincontainer");
var tagInput = document.getElementById("taginput");
var matchArray = [];
var search = document.getElementById("searchField");
var resultDivs = [];

var terms = [
    'Bread', 'Sourdough Bread', 'Vanilla essence', 'Durian', 'Cheese', 'Beef', 'Egg', 'Trout', 'Mushroom', 'Coffee', 'Lettuce', 'Tea', 'Brioche', 'Carrot', 'Onion', 'Garlic'
    ];

search.onkeyup = function() {
    var value = search.value;
    var matches = fuzzysort.go(value, terms, options=null);

    // empty array of element and remove childs from container
    matchArray.forEach((element) => {
        maincontainer.removeChild(element);
        matchArray = [];
    });

    // add divs to container for each returned ingredient
    for(var i = 0; i < matches.length; i++) {
        createSearchItem(matches[i].target);
    }

}

function clickedResult(element) {
    console.log(element.innerHTML);
    // add result to an array, either in text or element form
    // create 'tag' element, and append to 'tags' div
        // 'tag' element must have function to delete itself from the 'tags' array, when the x is clicked.
    // remember how to attach array of search terms to 'submit' button, to send in GET request to server.
    if (tagInput.value) { // add comma if term is not first
        tagInput.value += ","
    }
    tagInput.value += element.innerHTML;
}

function createSearchItem(item) {
    var div = document.createElement('div');
    maincontainer.appendChild(div);
    div.classname = "ingredientMatch";
    div.innerHTML = item;
    matchArray.push(div);
    div.setAttribute("onclick", "clickedResult(this);");
}

