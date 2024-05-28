import {updateArticles, hideParentIfLiHidden} from "../utils/algoFiltre.js"

let articleCounter = 0;


export function assignIdToArticle() {
  articleCounter++;
  return articleCounter;
}

document.addEventListener("DOMContentLoaded", () => {

  const searchFiltre = document.querySelector("#searchFiltre");
  const nbrRecettes = createNbrRecettes(sizeArticleRecettes());
  searchFiltre.appendChild(nbrRecettes);

  const selectRecette = document.getElementById("selectRecette");
  const elements = document.querySelectorAll("ul");
  //const articles = document.querySelectorAll("#boiteRecette article");

  const selectedItemsMap = new Map();

  elements.forEach((element) => {
    element.addEventListener("click", () => {
      toggleSelection(element);
      updateArticles();
    });
  });

  // Connecte les boutons de filtres avec les containers
  function init() {
    document.querySelectorAll('input').forEach((input) => {
      input.value = '';});
    const filterTypes = ['ingredients', 'appareils', 'ustensils'];

    filterTypes.forEach(filterType => {
      const barFiltre = document.querySelector(`.barFiltre[data-filter-type="${filterType}"]`);
      const containerList = document.querySelector(`.containerList${capitalizeFirstLetter(filterType)}`);
      if (barFiltre && containerList) {
        barFiltre.addEventListener('input', () => {
          filterContainerList(containerList, barFiltre.value.trim().toLowerCase());
        });
      }
    });

   document.querySelector('.buttonSearch').addEventListener('click', updateArticles);
    document.querySelector('#site-search').addEventListener('keyup', updateArticles);

  }

  // Permet de sélectionner un élément dans la liste
  function toggleSelection(element) {
    const isSelected = element.classList.contains("selected");

    if (!isSelected) {
      // Si l'élément n'est pas déjà sélectionné
      element.classList.add("selected");

      const searchClear = createSearchClear();
      element.appendChild(searchClear);

      const selectedItemText = element.textContent.replace("🞩", "");
      const selectedItem = createSelectedItem(selectedItemText);
      selectRecette.appendChild(selectedItem);
      selectedItem.appendChild(createItemX());
      selectedItemsMap.set(element, selectedItem);
      addRemoveListeners(selectedItem, element);
      hideParentIfLiHidden()
    } else {
      // Si l'élément est déjà sélectionné, le désélectionner
      element.classList.remove("selected");
      const selectedItem = selectedItemsMap.get(element);
      if (selectedItem) {
        selectRecette.removeChild(selectedItem);
        selectedItemsMap.delete(element);
        updateArticles(); // Mettre à jour les articles lorsque l'élément est désélectionné
      }
      removeSearchClear(element);
    }
  }

  function removeSelectedItem(selectedItem, element) {
    // Vérifier si l'élément est toujours visible avant de le supprimer
    if (element.style.display !== "none") {
      element.classList.remove("selected");
    }

    selectRecette.removeChild(selectedItem);
    removeSearchClear(element);
    selectedItemsMap.delete(element);

    updateArticles(); // Mettre à jour les articles lorsque l'élément est supprimé
  }

  function createNbrRecettes(articleCounter) {
    let nbrArticle = document.querySelector(".nbrArticle");
    if (!nbrArticle) {
      nbrArticle = document.createElement("div");
      nbrArticle.classList.add("nbrArticle");
    
    }
    nbrArticle.textContent = `${articleCounter} recettes`;
    return nbrArticle;
  }

  function sizeArticleRecettes() {
    const brecette = document.querySelector("#boiteRecette");
    const listArticles = brecette.querySelectorAll("article");
    return listArticles.length;
  }

  function createSearchClear() {
    const searchClear = document.createElement("div");
    searchClear.classList.add("searchClear");
    searchClear.textContent = "🞩";
    return searchClear;
  }

  function createSelectedItem(textContent) {
    const selectedItem = document.createElement("div");
    selectedItem.classList.add("selectedItem");
    selectedItem.textContent = textContent;
    return selectedItem;
  }

  function createItemX() {
    const itemX = document.createElement("div");
    itemX.textContent = "✕";
    itemX.classList.add("itemx");
    return itemX;
  }

  function addRemoveListeners(selectedItem, element) {

    selectedItem.addEventListener("click", () => {
      removeSelectedItem(selectedItem, element);
    });
    const itemX = selectedItem.querySelector(".itemx");
    itemX.addEventListener("click", (event) => {
      event.stopPropagation(); 
      removeSelectedItem(selectedItem, element);
    });
  }

  function removeSearchClear(element) {
    const searchClearToRemove = element.querySelector(".searchClear");
    if (searchClearToRemove) {
      element.removeChild(searchClearToRemove);
    }
  }

  function filterContainerList(container, searchTerm) {
    const listItems = container.querySelectorAll('li');
    const searchClear = container.querySelector('.searchClear');
    hideParentIfLiHidden()
    
    if (searchClear) {
      searchClear.style.display = '';
    }
    
    if (searchTerm === '') {
      // If the search term is empty, show all list items
      listItems.forEach(item => {
        item.parentNode.style.display = '';
        item.parentNode.classList.remove('hidden');
      });
      container.classList.remove('selected'); // Reset the "selected" class of the "ul" element
      hideParentIfLiHidden()
    } else {
      // Filter list items based on the search term
      listItems.forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();
        if (itemText.includes(searchTerm)) {
          item.parentNode.style.display = ''; // Show the matching item
          item.parentNode.classList.remove('hidden'); // Reset the "hidden" class
        } else {
          item.parentNode.style.display = 'none'; // Hide the non-matching item
        }
      });
    
      // Check if there are any visible items in the container
      const visibleItems = Array.from(listItems).filter(item => item.style.display !== 'none');
      if (visibleItems.length > 0) {
        container.style.display = 'block'; // Show the container if there are visible items
        container.classList.remove('selected'); // Reset the "selected" class of the "ul" element
      } else {
        container.style.display = 'none'; // Hide thecontainer if there are no visible items
        container.classList.remove('selected'); // Reset the "selected" class of the "ul" element
        if (searchClear) {
          searchClear.style.display = 'none';
        }
      }


    }
  }
    
  // Met en capitale le premier caractère de la chaine
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  init();

});