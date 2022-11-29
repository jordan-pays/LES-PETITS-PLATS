class View  {

    DisplayRecipes(recipes) {
        const container_all_recipe = document.getElementById("container_all_recipe");
        container_all_recipe.textContent =''
        recipes.forEach(element => {
            const container_recipe = document.createElement("div");
            container_recipe.setAttribute("class","container_recipe");
            const container_img = document.createElement("div");
            container_img.setAttribute("class","container_img");
            const container_info = document.createElement("div");
            container_info.setAttribute("class","container_info");
            const titre = document.createElement("h2");
            titre.innerHTML = element.name;
            container_info.append(titre)
            container_recipe.append(container_img)
            container_recipe.append(container_info)
            container_all_recipe.append(container_recipe)
        });
        
    }

    DisplayIngredients(ingredients){
        const container_ingredients = document.getElementById("container_ingredients");
        container_ingredients.textContent = "";
        ingredients.forEach(ingredient=>{
            const container_ingredient = document.createElement("li");
            container_ingredient.textContent = ingredient;
            container_ingredient.setAttribute("id",ingredient)
            container_ingredients.append(container_ingredient)
        })
    }
}