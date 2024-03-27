import {recetteFactory } from "../factories/recettes.js"
import {recipes} from "../utils/recipes.js";


async function getRecette() {

  // return recettesData;
  return recipes;

}
  
  

async function init() {
// Récupère les datas des recettes
const recettes = await getRecette();
displayData(recettes);
}

async function displayData(recettes) {

    const recetteSection = document.querySelector(".boiteRecette");

    recettes.forEach((recettes) => {
        const recetteCard = recetteFactory();
        const prepaRecetteCardDOM = recetteCard.recetteCardDOM(recettes);
        recetteSection.appendChild(prepaRecetteCardDOM);
    });

}


  init();