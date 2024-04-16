import {recipesFactory} from "../factories/recipesFactory.js"
import {recipes} from "../utils/recipes.js";

async function getRecette() {
  return recipes;
}

async function init() {
// Récupère les datas des recettes
const recettes = await getRecette();
displayData(recettes);
displayDataSearch(recettes);
}

async function displayData(recettes) {
    const recetteSection = document.querySelector("#boiteRecette");
    recettes.forEach((recettes) => {
        const recetteCard = recipesFactory();
        const prepaRecetteCardDOM = recetteCard.recetteCardDOM(recettes);
        recetteSection.appendChild(prepaRecetteCardDOM);
    });

}

async function displayDataSearch(recettes) {   
  const searchSection = document.querySelector("#searchFiltre");

  recettes.forEach((recettes) => {
      const recetteCard = recipesFactory();
      const searchCardDOM = recetteCard.searchinCardDOM(recettes);
      searchSection.appendChild(searchCardDOM);
  });


}

// Obtenez tous les éléments avec la classe 'openItem' et ajoutez un écouteur d'événement survol à chacun d'eux
document.querySelectorAll('.openItem').forEach((item) => {
  item.addEventListener('mouseover', () => {
    item.nextElementSibling.classList.remove('hide');
  });

  item.addEventListener('mouseout', (event) => {
    // Vérifie si la souris est toujours sur l'élément actuel ou ses enfants
    if (!item.contains(event.relatedTarget)) {
      item.nextElementSibling.classList.add('hide');
    }
  });

  // Ajoute un écouteur d'événement de sortie de souris à l'élément suivant de l'élément actuel
  item.nextElementSibling.addEventListener('mouseout', (event) => {
    if (!item.nextElementSibling.contains(event.relatedTarget)) {
      item.nextElementSibling.classList.add('hide');
    }
  });

  // Ajoute un écouteur d'événement de survol à l'élément suivant de l'élément actuel
  item.nextElementSibling.addEventListener('mouseover', () => {
    item.nextElementSibling.classList.remove('hide');
  });
});


const buttons = document.querySelectorAll('.filtreClear, .buttonClear');
buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    if (input && input.tagName.toLowerCase() === 'input') {
      input.value = "";
      input.dispatchEvent(new Event('input'));
    }
  });
});

export function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

document.addEventListener('DOMContentLoaded', function() {
  const containers = document.querySelectorAll('.containerIngredient, .containerAppareils, .containerUstensils');

  containers.forEach(function(container) {
      const input = container.querySelector('.barFiltre');
      const inconSearch = container.querySelector('#iconSearch');

      // Fonction pour vérifier le contenu de l'input et masquer l'icône si nécessaire
      function checkAndHideInconSearch() {
          if (input.value.trim() === '') {
              inconSearch.style.opacity = '1'; // Affiche l'icône si l'input est vide
          } else {
              inconSearch.style.opacity = '0'; // Cache l'icône si l'input contient du texte
          }
      }

      // Écoute l'événement de focus sur l'input
      input.addEventListener('focus', function() {
          checkAndHideInconSearch();
      });

      // Écoute l'événement de blur sur l'input
      input.addEventListener('blur', function() {
          checkAndHideInconSearch();
      });

      // Écoute l'événement de saisie (input) sur l'input
      input.addEventListener('input', function() {
          checkAndHideInconSearch();
      });

      // Vérifie l'état initial de l'input au chargement de la page
      checkAndHideInconSearch();
  });
});





init();
