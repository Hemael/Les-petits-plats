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

// Obtenez tous les éléments avec la classe 'iconSearch' et ajoutez un écouteur d'événement click à chacun d'eux
document.querySelectorAll('.iconSearch').forEach((item) => {
  item.addEventListener('click', function() {
      // Appelez la fonction 'filtre' avec le type de données et la valeur de filtre appropriés pour le conteneur actuel
      filtre(item.getAttribute('data-type'), item.parentNode.previousElementSibling.value);
  });
});

function filtre(type, value) {
  // Obtenez tous les éléments avec la classe qui correspond au type de données et basculez la classe 'hide' en fonction de savoir s'ils incluent la valeur de filtre
  document.querySelectorAll(`.${type}-box`).forEach((item) => {
      if (item.innerHTML.includes(value)) {
          item.classList.remove('hide');
      } else {
          item.classList.add('hide');
      }
  });
}

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



init();
