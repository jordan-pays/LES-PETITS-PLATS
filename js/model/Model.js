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

    async getSearchFilter(recipes, str) {
        const filterRecipes = recipes.filter((recipe) => this.filterFunction(recipe, str))
        filterRecipes.sort((a, b) => {
            return a.name.localeCompare(b.name);
        })

        return filterRecipes
    }

    getIngredientsFilter(ingredients,str) {
        if(str!=undefined){
            const filterIngredienst = ingredients.filter((ingredient)=>ingredient.includes(str.toLowerCase()))
            return filterIngredienst
        }else{
            return ingredients
        }
    }

    getAllIngredients(recipes){
        const arr = [];
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(element=>{
                arr.push(element.ingredient.toLowerCase())
            })
        });
        const data = arr.filter((ingredient, index) => arr.indexOf(ingredient) === index);
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

}


