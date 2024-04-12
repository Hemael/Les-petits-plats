

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

      // Récupérer le critère de tri depuis le texte de l'élément <ul> sélectionné
      const criterion = element.textContent.replace("🞩", '').trim().toLowerCase();

      // Filtrer les articles en fonction du critère sélectionné
      articles.forEach((article) => {
        const articleCategory = article.getAttribute('data-category').toLowerCase();
        if (criterion === 'tous' || articleCategory === criterion) {
          article.style.display = 'block';
        } else {
          article.style.display = 'flex';
        }
      });
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

    // Rétablir l'affichage de tous les articles
    articles.forEach((article) => {
      article.style.display = 'flex';
    });
  }

  function removeSearchClear(element) {
    const searchClearToRemove = element.querySelector('.searchClear');
    if (searchClearToRemove) {
      element.removeChild(searchClearToRemove);
    }
  }
});




