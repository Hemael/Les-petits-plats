import { filterData } from "../factories/recipesFactory.js";

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
  const articles = document.querySelectorAll("#boiteRecette article");

  const selectedItemsMap = new Map();

  elements.forEach((element) => {
    element.addEventListener("click", () => {
      toggleSelection(element);
      updateArticles();
    });
  });

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
    resetArticleDisplay(); // Réafficher toutes les recettes
    updateArticles(); // Mettre à jour les articles lorsque l'élément est supprimé
  }

  function resetArticleDisplay() {
    articles.forEach((article) => {
      article.style.display = "flex";
    });
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
    // Handle click on the selected item itself
    selectedItem.addEventListener("click", () => {
      removeSelectedItem(selectedItem, element);
    });

    // Handle click on the 'x' button within the selected item
    const itemX = selectedItem.querySelector(".itemx");
    itemX.addEventListener("click", (event) => {
      event.stopPropagation(); // Prevent the click from bubbling up to the parent
      removeSelectedItem(selectedItem, element);
    });
  }

  function removeSearchClear(element) {
    const searchClearToRemove = element.querySelector(".searchClear");
    if (searchClearToRemove) {
      element.removeChild(searchClearToRemove);
    }
  }

  // Définition de updateNbrRecettesDisplay()
  function updateNbrRecettesDisplay(count) {
    const nbrArticle = document.querySelector(".nbrArticle");
    if (nbrArticle) {
      nbrArticle.textContent = `${count} recettes`;
      // Autres actions à effectuer en fonction de count
    }
  }

  // Définition de updateArticles()
  function updateArticles() {
    const selectedItems = Array.from(selectRecette.children);
    const selectedValues = selectedItems
      .filter((item) => item.tagName === "DIV" && item.classList.contains("selectedItem"))
      .map((item) => item.textContent.replace("✕", "").trim().toLowerCase());


    // If no criteria is selected, display all recipes
    if (selectedValues.length === 0) {
      // @todo remettre les tags display: none en visible
      resetArticleDisplay();
      updateNbrRecettesDisplay(filterData.length); // Update the counter with 0 recipes
      return;
    }


    var selectedData = filterData;
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
    //console.log(selectedData)  @Todo Ici, pensé à rajouté la gestion des tags à exclure en fonction de ce qu'il reste dans selectedData
    


    // Hide all articles before displaying the matching ones
    articles.forEach((article) => {
      article.style.display = "none";
    });

    // Display the matching articles
    selectedData.forEach((article) => {
      const articleElement = document.getElementById(`${article.id}`);
      articleElement.style.display = "flex";
    });

    const visibleArticlesCount = selectedData.length;
    updateNbrRecettesDisplay(visibleArticlesCount); // Update the counter of displayed recipes
  }

  // Function to connect filters to their corresponding container lists
  function connectFiltersToContainers() {
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
  }

  // Function to filter container lists based on the search term
  function filterContainerList(container, searchTerm) {
    const listItems = container.querySelectorAll('li');
    const searchClear = container.querySelector('.searchClear');

    if (searchClear) {
      searchClear.style.display = 'flex';
    }

    if (searchTerm === '') {
      // If the search term is empty, show all list items
      listItems.forEach(item => {
        item.parentNode.style.display = 'flex';
        item.parentNode.classList.remove('hidden');
      });
      container.style.display = 'block'; // Show the container
      container.classList.remove('selected'); // Reset the "selected" class of the "ul" element
    } else {
      // Filter list items based on the search term
      listItems.forEach(item => {
        const itemText = item.textContent.trim().toLowerCase();

        if (itemText.includes(searchTerm)) {
          item.parentNode.style.display = 'flex'; // Show the matching item
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

  // Function to capitalize the first letter of a string
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // Call the function to connect filters to their corresponding container lists
  connectFiltersToContainers();

  // Add a check to prevent duplicates from being added to the selectedItemsMap

});