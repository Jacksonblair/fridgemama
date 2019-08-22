var mainContainer = document.getElementById("maincontainer");
var mainSearchInput = document.getElementById("mainsearchinput");
var tagInput = document.getElementById("taginput");
var tagsList = document.getElementById("tagslist");
var resultsDiv = document.getElementById("results");
var matchArray = [];
var search = document.getElementById("searchfield");
var resultDivs = [];

var terms = [
    'Bread', 'Sourdough Bread', 'Vanilla essence', 'Durian', 'Cheese', 'Beef', 'Egg', 'Trout', 'Mushroom', 'Coffee', 'Lettuce', 'Tea', 'Brioche', 'Carrot', 'Onion', 'Garlic'
    ];


search.onkeyup = function() {
    var value = search.value;
    var matches = fuzzysort.go(value, terms, options=null);

    // empty array of element and remove childs from container
    matchArray.forEach((element) => {
        resultsDiv.removeChild(element);
        matchArray = [];
    });

    // add divs to container for each returned ingredient
    for(var i = 0; i < matches.length; i++) {
        createSearchItem(matches[i].target);
    }

    // console.log(matches);

}

function clickedResult(element) {
    // console.log(element.innerHTML);

    // add to INVISIBLE input
    if (tagInput.value) { // add comma if term is not first
        tagInput.value += ","
    }
    tagInput.value += element.innerHTML;
    console.log("Adding to tagInput.html: " + element.innerHTML)
    console.log(tagInput.value);

    // add 'tag' to VISIBLE list of tags
    var tag = document.createElement('div');
    tagsList.appendChild(tag);
    tag.setAttribute("class", "tagbutton ui blue button");
    tag.style.fontFamily = "To-japan"
    tag.style.fontWeight = "normal"
    tag.style.margin = "5px"
    tag.innerHTML = element.innerHTML;

    // remove result from array and from displayed matches
    resultsDiv.removeChild(element);
    matchArray.splice(matchArray.indexOf(element), 1);
}

function removeResult(element) {
    matchArray[element].splice(element);
}

function createSearchItem(item) {
    var div = document.createElement('div');
    resultsDiv.appendChild(div);
    div.innerHTML = item;
    div.display = "block";
    matchArray.push(div);
    div.setAttribute("class", "item");
    div.setAttribute("onclick", "clickedResult(this);");
    div.style.fontFamily = "To-japan";
}

// search results visibility
$(document).click(function() {
  $('#results').hide();
});

$('#mainsearchinput').click(function() { 
  $('#results').show();
  return false;
});

$('#results').click(function() { 
  $('#results').show();
  return false;
});
