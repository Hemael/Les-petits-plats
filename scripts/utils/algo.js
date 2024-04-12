let articleCounter = 0;

export function assignIdToArticle() {
  articleCounter++;
  return articleCounter;
}

document.addEventListener('DOMContentLoaded', () => {
  const searchFiltre = document.querySelector("#searchFiltre");
  searchFiltre.appendChild(createNbrRecettes(sizeArticleRecettes()));

  const selectRecette = document.getElementById('selectRecette');
  const elements = document.querySelectorAll('ul');
  const articles = document.querySelectorAll('#boiteRecette article');

  const selectedItemsMap = new Map();

  elements.forEach((element) => {
    element.addEventListener('click', () => {
      toggleSelection(element);
      updateArticles();
    });
  });

  function toggleSelection(element) {
    element.classList.toggle('selected');

    if (element.classList.contains('selected')) {
      const searchClear = createSearchClear();
      element.appendChild(searchClear);

      const selectedItemText = element.textContent.replace("🞩", '');
      const selectedItem = createSelectedItem(selectedItemText);
      selectRecette.appendChild(selectedItem);
      selectedItem.appendChild(createItemX());
      selectedItemsMap.set(element, selectedItem);
      addRemoveListeners(selectedItem, element);
    } else {
      const selectedItem = selectedItemsMap.get(element);
      if (selectedItem) {
        selectRecette.removeChild(selectedItem);
        selectedItemsMap.delete(element);
      }
      removeSearchClear(element);
    }
  }

  function resetArticleDisplay() {
    articles.forEach((article) => {
      article.style.display = 'flex';
    });
  }

  function createNbrRecettes(articleCounter) {
    const nbrArticle = document.createElement("div");
    nbrArticle.classList.add('nbrArticle');
    nbrArticle.textContent = `${articleCounter} recettes`;
    return nbrArticle;
  }

  function sizeArticleRecettes() {
    const brecette = document.querySelector("#boiteRecette");
    const listArticles = brecette.querySelectorAll("article");
    return listArticles.length;
  }

  function createSearchClear() {
    const searchClear = document.createElement('div');
    searchClear.classList.add('searchClear');
    searchClear.textContent = '🞩';
    return searchClear;
  }

  function createSelectedItem(textContent) {
    const selectedItem = document.createElement('div');
    selectedItem.classList.add('selectedItem');
    selectedItem.textContent = textContent;
    return selectedItem;
  }

  function createItemX() {
    const itemX = document.createElement('div');
    itemX.textContent = "x";
    itemX.classList.add('itemx');
    return itemX;
  }

  function addRemoveListeners(selectedItem, element) {
    selectedItem.addEventListener('click', () => {
      removeSelectedItem(selectedItem, element);
    });

    selectedItem.querySelector('.itemx').addEventListener('click', () => {
      removeSelectedItem(selectedItem, element);
    });
  }

  function removeSelectedItem(selectedItem, element) {
    selectRecette.removeChild(selectedItem);
    element.classList.remove('selected');
    removeSearchClear(element);
    selectedItemsMap.delete(element);
    resetArticleDisplay(); // Réafficher toutes les recettes
  }

  function removeSearchClear(element) {
    const searchClearToRemove = element.querySelector('.searchClear');
    if (searchClearToRemove) {
      element.removeChild(searchClearToRemove);
    }
  }

  function updateArticles() {
    const selectedItems = Array.from(selectRecette.children);
    const selectedCriteria = selectedItems.map(item => item.textContent.replace("x", '').trim().toLowerCase());

    if (selectedCriteria.length === 0) {
      resetArticleDisplay();
      return;
    }

    articles.forEach((article) => {
      const articleText = article.textContent.toLowerCase();
      const isArticleMatching = selectedCriteria.some(criterion => articleText.includes(criterion));
      article.style.display = isArticleMatching ? 'flex' : 'none';
    });
  }
});