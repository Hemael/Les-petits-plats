import { filterData } from "../factories/recipesFactory.js";
let selectRecette 
let articles 

// Met à jour le compteur de recettes
function updateNbrRecettesDisplay(count) {
    const nbrArticle = document.querySelector(".nbrArticle");
    if (nbrArticle) {
        nbrArticle.textContent = `${count} recettes`;
    }
}

function createError(search){
    const error = document.querySelector(".error");
    error.textContent = `Aucune recette correspondant à ${search} vous pouvez chercher «tarte aux pommes », « poisson », etc.`;
}

function cleanError(){
    const error = document.querySelector(".error");
    error.textContent = "";
}

function resetArticleDisplay() {
    for (const article of articles) {
        article.style.display = "flex";
    }
}

export function updateArticles() {
    resetArticleDisplay();
    const selectedItems = Array.from(selectRecette.children);
    const selectedValues = [];
    for (const item of selectedItems) {
        if (item.tagName === "DIV" && item.classList.contains("selectedItem")) {
            selectedValues.push(item.textContent.replace("✕", "").trim().toLowerCase());
        }
    }

    let search = document.querySelector('#site-search').value;
    cleanError();

    // Si aucun tag selectionner, affiche tous les tags
    if (selectedValues.length === 0 && search.length < 3) {
        resetTag();
        return;
    }
    let selectedData = filterData;
    if (selectedValues.length > 0) {
        selectedData = filtreWithTags(selectedData, selectedValues);
    }
    if (search.length > 3) {
        selectedData = filterWithSearch(selectedData, search);
    }

    // Cache tous les articles avant d'afficher
    for (const article of articles) {
        article.style.display = "none";
    }
    applyResultFilter(selectedData);
}

function resetTag(){
    resetArticleDisplay();
    updateNbrRecettesDisplay(filterData.length); // Met à jour le compteur de recettes
    // Affiche  tous les tags
    const ingredientListItems = document.querySelectorAll(".containerListIngredients li");
    for (const item of ingredientListItems) {
        item.style.display = "list-item";
    }
    const applianceListItems = document.querySelectorAll(".containerListAppareils li");
    for (const item of applianceListItems) {
        item.style.display = "list-item";
    }
    const ustensilListItems = document.querySelectorAll(".containerListUstensils li"); 
    for (const item of ustensilListItems) {
        item.style.display = "list-item";
    }
}

function filtreWithTags(selectedData, selectedValues) {
    // Sort les recettes en fonction des critères sélectionnés
    selectedValues.forEach(function(check){
        check = check.toLowerCase();
        selectedData = selectedData.filter(function(data){
        if(data.appliance.toLowerCase() == check){
            return true;
        }else if(data.ustensils.map(str => str.toLowerCase()).includes(check)){
            return true;
        }else if(data.ingredients.map(str => str.toLowerCase()).includes(check)){
            return true;
        }
        return false;
        })
    })
    return selectedData;
}

function filterWithSearch(selectedData, search) {
    const searchData = [];
    const searchLower = search.toLowerCase();
  
    for (let i = 0; i < selectedData.length; i++) {
      const data = selectedData[i];
      const nameLower = data.name.toLowerCase();
      const descriptionLower = data.description.toLowerCase();
  
      if (nameLower.includes(searchLower) || descriptionLower.includes(searchLower)) {
        searchData.push(data);
      } else {
        for (let j = 0; j < data.ingredients.length; j++) {
          const ingredientLower = data.ingredients[j].toLowerCase();
          if (ingredientLower.includes(searchLower)) {
            searchData.push(data);
            break;
          }
        }
      }
    }
  
    if (searchData.length === 0) {
      createError(search);
    }
  
    return searchData;
  }

function applyResultFilter(selectedData){
    // Affiche ce qui match avec les articles sélectionnés
    for (const article of selectedData) {
        const articleElement = document.getElementById(`${article.id}`);
        articleElement.style.display = "flex";
    }

    // Met a jour les listes en fonction de ce qui est selectionné
    const ingredientList = document.querySelector(".containerListIngredients");
    hideNonMatchingListItems(ingredientList, selectedData);
    const applianceList = document.querySelector(".containerListAppareils");
    hideNonMatchingListItems(applianceList, selectedData);
    const ustensilList = document.querySelector(".containerListUstensils");
    hideNonMatchingListItems(ustensilList, selectedData);
    const visibleArticlesCount = selectedData.length;
    updateNbrRecettesDisplay(visibleArticlesCount); 
}

// Gestion des ListItems
function hideNonMatchingListItems(list, selectedData) {
    const listItems = list.querySelectorAll('li');
    for (const item of listItems) {
        const itemValue = item.textContent.trim().toLowerCase();
        const ingredientsMatch = selectedData.some(data => data.ingredients.some(ingredient => ingredient.toLowerCase() === itemValue));
        const applianceMatch = selectedData.some(data => data.appliance.toLowerCase() === itemValue);
        const ustensilMatch = selectedData.some(data => data.ustensils.some(ustensil => ustensil.toLowerCase() === itemValue));
        if (ingredientsMatch || applianceMatch || ustensilMatch) {
            item.style.display = "list-item";
        } else {
            item.style.display = "none";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    selectRecette = document.getElementById("selectRecette");
    articles = document.querySelectorAll("#boiteRecette article");
});
    