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
    articles.forEach((article) => {
        article.style.display = "flex";
    });
}

export function updateArticles() {
    resetArticleDisplay();
    const selectedItems = Array.from(selectRecette.children);
    const selectedValues = selectedItems
        .filter((item) => item.tagName === "DIV" && item.classList.contains("selectedItem"))
        .map((item) => item.textContent.replace("✕", "").trim().toLowerCase());

    let search = document.querySelector('#site-search').value;
    cleanError();

    // Si aucun tag selectionner, affiche tous les tags
    if (selectedValues.length === 0 && search.length < 2) {
        resetTag();
        return;
    }
    let selectedData = filterData;
    if (selectedValues.length > 0) {
        selectedData = filtreWithTags(selectedData, selectedValues);}
    if (search.length > 2) {
        selectedData = filterWithSearch(selectedData, search);}

    // Cache tous les articles avant d'afficher
    articles.forEach((article) => {
        article.style.display = "none";
    });
    applyResultFilter(selectedData);
}

function resetTag(){
    resetArticleDisplay();
    updateNbrRecettesDisplay(filterData.length); // Met à jour le compteur de recettes

    // Affiche  tous les tags
    const ingredientListItems = document.querySelectorAll(".containerListIngredients li");
    ingredientListItems.forEach((item) => {
        item.style.display = "flex";
    });
    const applianceListItems = document.querySelectorAll(".containerListAppareils li");
    applianceListItems.forEach((item) => {
        item.style.display = "flex";
    });
    const ustensilListItems = document.querySelectorAll(".containerListUstensils li"); 
    ustensilListItems.forEach((item) => {
        item.style.display = "flex";
    });

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
    selectedData = selectedData.filter(function(data){
    if(data.name.toLowerCase().includes(search.toLowerCase())){
    return true;
    }else if(data.description.toLowerCase().includes(search.toLowerCase())){
    return true;
    }else if(data.ingredients.map(str => str.toLowerCase()).filter(str => str.includes(search.toLowerCase())).length >= 1){
    return true;
    }
    return false;
    });
    if (selectedData.length === 0) {
        createError(search)
    }
    return selectedData;
}

function applyResultFilter(selectedData){
// Affiche ce qui match avec les articles sélectionnés
    selectedData.forEach((article) => {
        const articleElement = document.getElementById(`${article.id}`);
        articleElement.style.display = "flex";
    });

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
    listItems.forEach((item) => {
        const itemValue = item.textContent.trim().toLowerCase();
        const ingredientsMatch = selectedData.some((data) =>
        data.ingredients.some((ingredient) => ingredient.toLowerCase() === itemValue)
        );

        const applianceMatch = selectedData.some((data) =>
        data.appliance.toLowerCase() === itemValue
        );

        const utensilsMatch = selectedData.some((data) =>
        data.ustensils.some((utensil) => utensil.toLowerCase() === itemValue)
        );

        if (!ingredientsMatch && !applianceMatch && !utensilsMatch) {
            item.style.display = "none";
        } else {
            item.style.display = "flex";
        }
    });

}

document.addEventListener("DOMContentLoaded", () => {
    selectRecette = document.getElementById("selectRecette");
    articles = document.querySelectorAll("#boiteRecette article");
});
    