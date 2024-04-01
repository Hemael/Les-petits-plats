export function recetteFactory(){
    
    function recetteCardDOM(recipes){
        const { image, name, description, time } = recipes;
        const picture = `assets/images/${image}`;


        const boiteRecette = document.querySelector(".boiteRecette");
        
        
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
        
        

        h2.textContent = name;
        titreRecette.textContent ="RECETTE";
        titreIngredients.textContent = "INGRÉDIENTS";
        textRecette.textContent = description;
        timeRecette.textContent = time + " min";


        boiteRecette.appendChild(article);
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
          const recQuantite = document.createElement("p"); 
          
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
          
          
        
        });

          


        return article;
    }

    function searchinCardDOM(recipes){
      const { appliance, ustensils } = recipes;

      const boiteUstensils = document.querySelector('.ustensils-box');
      const boiteIngredient = document.querySelector('.ingredient-box');
      const boiteAppareils = document.querySelector('.appareils-box');


      boiteUstensils.textContent = ustensils;
      boiteAppareils.textContent = appliance;
      

      console.log(ustensils)



      return { boiteAppareils, boiteIngredient, boiteUstensils};
    }

    return {recetteCardDOM, searchinCardDOM}

}

