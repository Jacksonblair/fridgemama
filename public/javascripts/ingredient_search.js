var mainSearchInput = document.getElementById("main-search-input");
var tagInput = document.getElementById("tag-input");
var tagInputArray = []; // store value to parse to tagInput field
var tagsList = document.getElementById("tags-list");
var resultsDiv = document.getElementById("results");
var matchArray = [];
var search = document.getElementById("search-field");
var resultDivs = [];

var terms = [
    'Bread', 'Sourdough Bread', 'Vanilla essence', 'Durian', 'Cheese', 'Beef', 'Egg', 'Trout', 'Mushroom', 'Coffee', 'Lettuce', 'Tea', 'Brioche', 'Carrot', 'Onion', 'Garlic'
    ];


search.onkeyup = function() {
    var value = search.value;
    var matches = fuzzysort.go(value, terms, options=null);
    matches = matches.splice(0, 5);

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

    // add to array of clicked search terms
    tagInputArray.push(element.innerHTML);

    // format array and push into input field
    tagInput.value = tagInputArray.join(',');

    console.log(tagInput.value);
    console.log(tagInputArray);

    // add 'tag' to VISIBLE list of tags
    var tag = document.createElement('div');
    tagsList.appendChild(tag);
    tag.setAttribute("class", "tagbutton ui blue button");
    tag.setAttribute("onclick", "removeTag(this)");
    tag.style.fontFamily = "To-japan"
    tag.style.fontWeight = "normal"
    tag.style.margin = "5px"
    tag.innerHTML = element.innerHTML;

    // remove result from array and from displayed matches
    resultsDiv.removeChild(element);
    matchArray.splice(matchArray.indexOf(element), 1);
}

function removeResult(element) {
    tagsList.splice(tagsList.indexOf(element), 1);
    tagsList.removeChild(element);
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


// remove tag from tagslist when clicked
function removeTag(tag) {
    tagInputArray.splice(tagInputArray.indexOf(tag.innerHTML), 1);
    tagsList.removeChild(tag);

}


// search results visibility
$(document).click(function() {
  $('#results').hide();
});

$('#main-search-input').click(function() { 
  $('#results').show();
  return false;
});

$('#results').click(function() { 
  $('#results').show();
  return false;
});
