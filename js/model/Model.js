class Model {

    async getAllRecipe() {
        const data = await fetch("../../data/recipe.json").then(response => {
            return response.json();
        }).then(jsondata => {
            const recipes = jsondata.recipes;
            recipes.sort((a, b) => {
                return a.name.localeCompare(b.name);
            })

            return recipes
        });
        return data
    }

    getSearchFilter(recipes, str) {
        const filterRecipes = recipes.filter((recipe) => this.filterFunction(recipe, str));
        filterRecipes.sort((a, b) => {
            return a.name.localeCompare(b.name);
        });
        return filterRecipes;
    }

    getSearchFor(recipes, str){
        const recipeTrouve = [];
        for(let i=0;i<recipes.length;i++){
           let estTrouve = this.filterFunction(recipes[i],str);
           if(estTrouve){
            recipeTrouve.push(recipes[i]);
           }
        }
        return recipeTrouve;
    }

    getBadgeFilter(recipes, badges) {
        const filterRecipes = recipes.filter((recipe) => this.filterFunctionBadge(recipe, badges))
        filterRecipes.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })
        return filterRecipes
    }

    getIngredientsFilter(ingredients, str) {
        if (str != undefined) {
            const filterIngredient = ingredients.filter((ingredient) => ingredient.includes(str.toLowerCase()))
            return filterIngredient
        } else {
            return ingredients
        }
    }

    getAppareilsFilter(appareils, str) {
        if (str != undefined) {
            const filterAppareils = appareils.filter((appareil) => appareil.toLowerCase().includes(str.toLowerCase()))
            return filterAppareils
        } else {
            return appareils
        }
    }

    getUstensilesFilter(ustensiles, str) {
        if (str != undefined) {
            const filtersUtensiles = ustensiles.filter((ustensile) => ustensile.toLowerCase().includes(str.toLowerCase()))
            return filtersUtensiles
        } else {
            return ustensiles
        }
    }

    getAllIngredients(recipes) {
        const arr = [];
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(element => {
                arr.push(element.ingredient.toLowerCase())
            })
        });
        const data = arr.filter((ingredient, index) => arr.indexOf(ingredient) === index);
        data.sort((a, b) => {
            return a.localeCompare(b);
        })
        return data
    }

    getAllAppareils(recipes) {
        const arr = [];
        recipes.forEach(recipe => {
            arr.push(recipe.appliance.toLowerCase())
        });
        const data = arr.filter((appareils, index) => arr.indexOf(appareils) === index);
        data.sort((a, b) => {
            return a.localeCompare(b);
        })
        return data

    }

    getAllUstensiles(recipes) {
        const arr = [];
        recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => {
                arr.push(ustensil.toLowerCase())
            })
        });
        const data = arr.filter((ustensils, index) => arr.indexOf(ustensils) === index);
        data.sort((a, b) => {
            return a.localeCompare(b);
        })
        return data
    }

    filterFunction(recipe, str) {
        if (recipe.name.toLowerCase().includes(str.toLowerCase())) {
            return true
        } else if (recipe.description.toLowerCase().includes(str.toLowerCase())) {
            return true
        } else {
            let i = 0;
            let estTrouve = false;
            while (i < recipe.ingredients.length && !estTrouve) {
                if (recipe.ingredients[i].ingredient.toLowerCase().includes(str.toLowerCase())) {
                    estTrouve = true
                }
                i++;
            }
            return estTrouve
        }
    }

    filterFunctionBadge(recipe, badges) {
        let i = 0;
        let estTrouve = true;
        while (i < badges.length && estTrouve) {
            let badge = badges[i]
            switch (badge.type) {
                case "ingredients":
                    let j =0;
                    let estTrouveBis = false
                    while (j < recipe.ingredients.length && !estTrouveBis) {
                        if (recipe.ingredients[j].ingredient.toLowerCase() == badge.name) {
                            estTrouveBis = true
                        }
                        j++;
                    }
                    if(!estTrouveBis){
                        estTrouve = false
                    }
                    break;
                case "appareils":
                    if(recipe.appliance.toLowerCase() != badge.name){
                        estTrouve = false
                    }
                    break;
                case "ustensiles":
                    let k =0;
                    let estUstensiles = false;
                    while (k< recipe.ustensils.length && !estUstensiles) {
                        if (recipe.ustensils[k].toLowerCase() == badge.name) {
                            estUstensiles = true 
                        }
                        k++;
                    }
                    if(!estUstensiles){
                        estTrouve = false
                    }
                    break;
                default:
                    break;
            }
            i++
        }
        return estTrouve
    }

}


