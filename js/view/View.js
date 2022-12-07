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
            const container_title = document.createElement("div");
            container_title.setAttribute("class", "container_title")
            const titre = document.createElement("h2");
            titre.innerHTML = element.name;
            const time = document.createElement("h3");
            time.innerHTML = `${element.time} min`;
            const container_description = document.createElement("div")
            container_description.setAttribute("class","container_description")
            const description = document.createElement("p")
            description.innerHTML = element.description
            const listingIngredients = document.createElement("ul")
            element.ingredients.forEach((element) => {
                const showIngredient = document.createElement("li")
                const titleIngredient = document.createElement("span")
                titleIngredient.setAttribute("class", "titleIngredient")
                titleIngredient.textContent = `${element.ingredient}`
                showIngredient.appendChild(titleIngredient)

                if(element.quantity != undefined){
                    const quantityIngredient = document.createElement("span")
                    let changeUnit = "";
                    if (element.unit != undefined) {
                        switch (element.unit) {
                            case "grammes":
                                changeUnit = "g"
                                break;
                            default:
                                if (element.unit.length > 2) {
                                    changeUnit = ` ${element.unit}`
                                } else {
                                    changeUnit = element.unit
                                }
                                break;
                        }
                    }
                    quantityIngredient.textContent = `: ${element.quantity}${changeUnit}`
                    showIngredient.appendChild(quantityIngredient)
                }
                
                listingIngredients.appendChild(showIngredient)
            })
            container_title.appendChild(titre)
            container_title.appendChild(time)
            container_description.appendChild(listingIngredients)
            container_description.appendChild(description)
            container_info.append(container_title)
            container_info.append(container_description)
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

    DisplayUstensiles(ustensiles) {
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
        container_badge.textContent = "";
        arrayBadge.forEach(element => {
            const badge = document.createElement("div");
            const textBadge = document.createElement("p");
            textBadge.textContent = element.name;
            badge.setAttribute("id", `badge_${element.name}`)
            badge.setAttribute("class", `badge ${element.type == "ingredients" ? 'blue' : element.type == "appareils" ? 'green' : 'red'}`)
            badge.appendChild(textBadge)
            container_badge.append(badge)
        });
    }
}