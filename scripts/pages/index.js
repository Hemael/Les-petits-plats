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
displayDataSearch(recettes);
}

async function displayData(recettes) {

    const recetteSection = document.querySelector("#boiteRecette");

    recettes.forEach((recettes) => {
        const recetteCard = recetteFactory();
        const prepaRecetteCardDOM = recetteCard.recetteCardDOM(recettes);
        recetteSection.appendChild(prepaRecetteCardDOM);

    });

}

async function displayDataSearch(recettes) {
    
  const searchSection = document.querySelector("#searchFiltre");

  recettes.forEach((recettes) => {
      const recetteCard = recetteFactory();
      const searchCardDOM = recetteCard.searchinCardDOM(recettes);
      searchSection.appendChild(searchCardDOM);
  });


}


// Obtenez tous les éléments avec la classe 'openItem' et ajoutez un écouteur d'événement click à chacun d'eux
document.querySelectorAll('.openItem').forEach((item) => {
  item.addEventListener('click', () => {
    // Mettre la classe 'hide' sur les éléments 'filtreSearch' et 'containerList' pour le conteneur actuel
    item.nextElementSibling.classList.toggle('hide');
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
      input.value = '';
    }
  });
});






let articleCounter = 0;

export function assignIdToArticle() {
  articleCounter++;
  return articleCounter;
}

function createNbrRecettes(articleCounter) {
  const nbrArticle = document.createElement("div");
  nbrArticle.classList.add('nbrArticle');
  nbrArticle.textContent = articleCounter + " recettes";
  
  return nbrArticle;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchFiltre = document.querySelector("#searchFiltre");
  searchFiltre.appendChild(createNbrRecettes(sizeArticleRecettes()));

  function sizeArticleRecettes(){
    const brecette = document.querySelector("#boiteRecette");
    const listArticles = brecette.querySelectorAll("article");
    console.log(listArticles)
    console.log(brecette)

    return listArticles.length
  }
});



document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('ul');
  const selectRecette = document.getElementById('selectRecette');

  elements.forEach((element, index) => {
    element.setAttribute('data-ul', index);
    element.addEventListener('click', () => {
      console.log('Element clicked');
      // Ajoutez ou supprimez la classe 'selected' à l'élément cliqué
      element.classList.toggle('selected');

      // Créez un élément 'div' avec la classe 'searchClear' et le texte 'x'
      const searchClear = document.createElement('div');
      searchClear.classList.add('searchClear');
      searchClear.textContent = '🞩';

      // Si l'élément est sélectionné, ajoutez l'élément 'div' à l'élément 'ul'
      if (element.classList.contains('selected')) {
        element.appendChild(searchClear);

        // Créez un élément 'div' avec la classe 'selectedItem' et le texte de l'élément sélectionné
        const selectedItem = document.createElement('div');
        selectedItem.classList.add('selectedItem');
        selectedItem.textContent = element.textContent;

        // Ajoutez l'élément 'div' à l'élément 'div' avec l'id 'selectRecette'
        selectRecette.appendChild(selectedItem);

        // Ajoutez un écouteur d'événements au div avec la classe 'selectedItem'
        const selectedItemToRemove = selectRecette.querySelector('.selectedItem:last-child');
        if (selectedItemToRemove) {
          selectedItemToRemove.addEventListener('click', () => {
            console.log('Selected item clicked');
            // Supprimez l'élément 'div' correspondant à l'élément désélectionné de l'élément 'div' avec l'id 'selectRecette'
            selectRecette.removeChild(selectedItemToRemove);

            // Supprimez la classe 'selected' de l'élément 'ul'
            const selectedElement = Array.from(elements).filter((el) => el.textContent === selectedItemToRemove.textContent)[0];
            if (selectedElement) {
              selectedElement.classList.remove('selected');
            }

            // Supprimez l'élément 'div' de l'élément 'ul'
            const searchClearToRemove = selectedElement.querySelector('.searchClear');
            if (searchClearToRemove) {
              selectedElement.removeChild(searchClearToRemove);
            }
          });
        }
      } else {
        // Supprimez l'élément 'div' de l'élément 'ul'
        const searchClearToRemove = element.querySelector('.searchClear');
        if (searchClearToRemove) {
          element.removeChild(searchClearToRemove);
        }

        // Supprimez l'élément 'div' correspondant à l'élément désélectionné de l'élément 'div' avec l'id 'selectRecette'
        const selectedItemToRemove = selectRecette.querySelector('.selectedItem:last-child');
        if (selectedItemToRemove) {
          selectRecette.removeChild(selectedItemToRemove);
        }
      }
    });
  });
});


init();



  