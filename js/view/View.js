class View {

    DisplayRecipes(recipes) {
        const container_all_recipe = document.getElementById("container_all_recipe");
        container_all_recipe.textContent = ''
        recipes.forEach(element => {
            const container_recipe = document.createElement("div");
            container_recipe.setAttribute("class", "container_recipe");
            const container_img = document.createElement("div");
            container_img.setAttribute("class", "container_img");
            const container_info = document.createElement("div");
            container_info.setAttribute("class", "container_info");
            const titre = document.createElement("h2");
            titre.innerHTML = element.name;
            container_info.append(titre)
            container_recipe.append(container_img)
            container_recipe.append(container_info)
            container_all_recipe.append(container_recipe)
        });

    }

    DisplayIngredients(ingredients) {
        const container_ingredients = document.getElementById("container_ingredients");
        container_ingredients.textContent = "";
        ingredients.forEach(ingredient => {
            const container_ingredient = document.createElement("li");
            container_ingredient.textContent = ingredient;
            container_ingredient.setAttribute("id", `tags_${ingredient}`)
            container_ingredients.append(container_ingredient)
        })
    }

    DisplayAppareils(appareils) {
        const container_appareils = document.getElementById("container_appareils");
        container_appareils.textContent = "";
        appareils.forEach(appareil => {
            const container_appareil = document.createElement("li");
            container_appareil.textContent = appareil;
            container_appareil.setAttribute("id", `tags_${appareil}`)
            container_appareils.append(container_appareil)
        })
    }

    DisplayUstensiles(ustensiles){
        const container_ustensiles = document.getElementById("container_ustensiles");
        container_ustensiles.textContent = "";
        ustensiles.forEach(ustensile => {
            const container_ustensile = document.createElement("li");
            container_ustensile.textContent = ustensile;
            container_ustensile.setAttribute("id", `tags_${ustensile}`)
            container_ustensiles.append(container_ustensile)
        })
    }

    DisplayBadge(arrayBadge) {
        const container_badge = document.getElementById("container_badge")
        container_badge.textContent= "";
        arrayBadge.forEach(element => {
            const badge = document.createElement("div");
            const textBadge = document.createElement("p");
            textBadge.textContent = element.name;
            badge.setAttribute("id", `badge_${element.name}`)
            badge.setAttribute("class",`badge ${element.type == "ingredients" ? 'blue' : element.type == "appareils" ? 'green' : 'red'}`)
            badge.appendChild(textBadge)
            container_badge.append(badge)
        });
    }
}