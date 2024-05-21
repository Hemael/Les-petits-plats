import { assignIdToArticle } from '../utils/algo.js';
import { capitalizeFirstLetter } from '../pages/index.js';

export let filterData = [];
export function recipesFactory(){
    
  // Create an empty array to store filter data


  function recetteCardDOM(recipes){
    const { image, name, description, time } = recipes;
    const picture = `assets/images/${image}`;

  
    const article = document.createElement('article');
    
    const h2 = document.createElement("h2");
    const secRecette = document.createElement('section');
    const secIngredients = document.createElement('section');
    const titreRecette = document.createElement("h3");
    const titreIngredients = document.createElement("h3");
    const textRecette = document.createElement("p");
    const divIngredient = document.createElement("div");
    const timeRecette = document.createElement("div");
    
    const img =document.createElement('img');
    img.setAttribute("src",picture);
    img.setAttribute("alt", `${name} - Recette`)
    
    
    article.classList.add("carteRecette");
    img.classList.add("imageRecette");
    h2.classList.add("titreRecette");
    secRecette.classList.add("secRecette");
    secIngredients.classList.add("secIngredients");
    titreIngredients.classList.add("titreCategorie");
    titreRecette.classList.add("titreCategorie");
    textRecette.classList.add("textRecette");
    divIngredient.classList.add("ingredientDiv");
    timeRecette.classList.add("timePrep");

    const articleId = assignIdToArticle();
    article.classList.add(`${articleId}`);
    article.setAttribute('id', articleId);
    

    h2.textContent = name;
    titreRecette.textContent ="RECETTE";
    titreIngredients.textContent = "INGRÉDIENTS";
    textRecette.textContent = description;
    timeRecette.textContent = time + " min";

    article.appendChild(timeRecette);
    article.appendChild(img);
    article.appendChild(h2);
    article.appendChild(secRecette);
    article.appendChild(secIngredients);
    secRecette.appendChild(titreRecette);
    secRecette.appendChild(textRecette)
    secIngredients.appendChild(titreIngredients);
        
    recipes.ingredients.forEach((ingredientObj) => {
      const recIngredient = document.createElement("p");      
      const recQuantite = document.createElement("span"); 

      
      recIngredient.classList.add("ingredient"); 
      recQuantite.classList.add("quantite");  

      recIngredient.textContent = ingredientObj.ingredient;
      
      let quantityText = ingredientObj.quantity;
    
      if (ingredientObj.unit) {
        quantityText += ` ${ingredientObj.unit}`;
      }
    
      recQuantite.textContent = quantityText;
      
      divIngredient.appendChild(recIngredient);
      recIngredient.appendChild(recQuantite);
      secIngredients.appendChild(divIngredient);
      article.dataset.recipeId = articleId;
    });

    let tmpArray = [];
    tmpArray = {
      id: recipes.id,
      appliance: recipes.appliance,
      name: recipes.name,
      description: recipes.description,
      ustensils: recipes.ustensils.map(ustensil => ustensil.trim()),
      ingredients: recipes.ingredients.map(ingredient => ingredient.ingredient.trim())    
    }
    
    filterData.push(tmpArray);
    article.dataset.filterData = JSON.stringify(tmpArray);
    article.setAttribute('id', articleId);
    return article;
  }


  function searchinCardDOM(recipes) {
    const { appliance, ustensils, ingredients } = recipes;


    // Remove duplicates from the ingredients array string.charAt(0).toUpperCase() + string.slice(1);
    let lowercaseIngredients = ingredients.map(ingredient => capitalizeFirstLetter(ingredient.ingredient));
    const uniqueIngredients = [...new Set(lowercaseIngredients)];
    const filtreIngredient = document.querySelector(".containerIngredient");
    const containersearchIngredient = document.querySelector(".containerSearchIngredient");
    const containerListIngredient = document.querySelector(".containerListIngredients");
  
    const filtreAppareils = document.querySelector(".containerAppareils");
    const containersearchAppareils = document.querySelector(".containerSearchAppareils");
    const containerListAppareils = document.querySelector(".containerListAppareils");
  
    const filtreUstensils = document.querySelector(".containerUstensils");
    const containersearchUstensils = document.querySelector(".containerSearchUstensils");
    const containerListUstensils = document.querySelector(".containerListUstensils");


    // Iterate through the unique ingredients array and create a new list for each ingredient
    uniqueIngredients.forEach((ingredient) => {
      const ingredientObj = ingredients.find((obj) => capitalizeFirstLetter(obj.ingredient) === ingredient);
      const ulIngredient = document.createElement('ul');
  
      // Check if the ingredient already exists in the containerListIngredient
      const existingIngredient = Array.from(containerListIngredient.children).find((child) => {
        return child.textContent.trim() === ingredient;
      });
  
      if (!existingIngredient) {
        const liIngredient = document.createElement('li');
        liIngredient.classList.add('ingredient-box');
        liIngredient.textContent = capitalizeFirstLetter(ingredientObj.ingredient);
        ulIngredient.appendChild(liIngredient);
  
        filtreIngredient.appendChild(containersearchIngredient);
        containersearchIngredient.appendChild(containerListIngredient);
        containerListIngredient.appendChild(ulIngredient);
      }
    });
    
    // Remove duplicates from the appliance array
    const uniqueAppliance = Array.from(new Set(appliance.split(',').map(appliance => capitalizeFirstLetter(appliance.trim())))).join(', ');
    const ulAppareils = document.createElement('ul');
    const liAppareils = document.createElement('li');
    liAppareils.classList.add('appareils-box');
    liAppareils.textContent = uniqueAppliance;
    ulAppareils.appendChild(liAppareils);
  
    const existingAppliance = Array.from(containerListAppareils.children).find((child) => {
      return capitalizeFirstLetter(child.textContent.trim()) === uniqueAppliance;
    });
    if (!existingAppliance) {
      filtreAppareils.appendChild(containersearchAppareils);
      containersearchAppareils.appendChild(containerListAppareils);
      containerListAppareils.appendChild(ulAppareils);
    }
  
    // Remove duplicates from the ustensils array
    const uniqueUstensils = [...new Set(ustensils.map(ustensil => capitalizeFirstLetter(ustensil)))];
  
    // Iterate through the unique ustensils array and create a new list for each ustensil
    uniqueUstensils.forEach((ustensil) => {
      const ulUstensils = document.createElement('ul');
  
      // Check if the ustensil already exists in the containerListUstensils
      const existingUstensil = Array.from(containerListUstensils.children).find((child) => {
        return child.textContent.trim() === ustensil;
      });
  
      if (!existingUstensil) {
        const liUstensils = document.createElement('li');
        liUstensils.classList.add('ustensils-box');
        liUstensils.textContent = ustensil;
        ulUstensils.appendChild(liUstensils);

        filtreUstensils.appendChild(containersearchUstensils);
        containersearchUstensils.appendChild(containerListUstensils);
        containerListUstensils.appendChild(ulUstensils);
      }

    });

    return filtreIngredient, filtreAppareils, filtreUstensils;
  }

  return {recetteCardDOM, searchinCardDOM}

}


