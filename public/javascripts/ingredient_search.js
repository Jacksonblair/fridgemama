var mainSearchInput = document.getElementById("main-search-input");
var tagInput = document.getElementById("tag-input"); // Field to submit to backend
var tagsList = document.getElementById("tags-list"); // Div containing ingredient tags
var resultsDiv = document.getElementById("results"); // Dropdown div containing results of keyword search
var search = document.getElementById("search-field"); // Text input for typing keywords
var resultDivs = [];
var matchArray = [];

var terms = [
    'Bread', 'Sourdough Bread', 'Vanilla essence', 'Durian', 'Cheese', 'Beef', 'Egg', 'Trout', 'Mushroom', 'Coffee', 'Lettuce', 'Tea', 'Brioche', 'Carrot', 'Onion', 'Garlic'
    ];




/* Search input functionality */

search.onkeyup = function() {
    var value = search.value;
    var matches = fuzzysort.go(value, terms, options=null);
    matches = matches.splice(0, 5);

    // remove previous results
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

/* Ingredient tags functionality */


function clickedResult(element) {
    // console.log(element.innerHTML);

    addHiddenTag(element);

    addVisibleTag(element);

    // // add to array of clicked search terms
    // tagInputArray.push(element.innerHTML);

    // // format array and push into input field
    // tagInput.value = tagInputArray.join(',');

}

function addHiddenTag(element) {
    // add to INVISIBLE input
    if (tagInput.value) { // add comma if term is not first term
        tagInput.value += ","
    }

    // tagInput.value += element.innerHTMl;
    tagInput.value += element.innerHTML;

    console.log(tagInput.value)
}

function addVisibleTag(element) {
    // add 'tag' to VISIBLE list of tags
    var tag = document.createElement('div');
    tag.setAttribute("class", "ui blue button tag-button");
    tag.style.fontFamily = "To-japan"
    tag.style.fontWeight = "normal"
    tag.style.margin = "5px"
    tag.innerHTML = element.innerHTML + " "; // Add space between name and  close icon

    // Add CLOSE icon to tag element
    var removeIcon = document.createElement('i');
    removeIcon.className = "fas fa-times";
    removeIcon.innerHTML = "x";
    removeIcon.setAttribute("onclick", "removeTag(this)");
    tag.appendChild(removeIcon);

    // Append tag to visible tags list
    tagsList.appendChild(tag);

        /* To do with search field input & results */
    // remove result from search field results array and from displayed matches
    resultsDiv.removeChild(element);
    matchArray.splice(matchArray.indexOf(element), 1);
}


// remove tag from tagslist when clicked
function removeTag(tag) {

    /* 
    - Convert current value of input to array
    - Get string value of tag to be removed from array
    - Remove element from array that matches ^ string value
     */

     // THIS IS FUCKED

    var currentTags = tagInput.value.split(',');
    console.log(currentTags);

    var tagToRemove = tag.parentNode.innerHTML.split(' ')[0];

    currentTags.forEach((element) => {
        if (element === tagToRemove) {
            console.log("matching: " + element + " -- " + tagToRemove);
        }
    });

    currentTags.join(',');

    console.log(currentTags);

    // remove tag element (which is parent of the 'close' icon used to trigger function)
    tagsList.removeChild(tag.parentNode);


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
