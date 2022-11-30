class Controleur {

    constructor() {
        this.arrayAllRecipe = null;
        this.arrayRecipeFilters = null;
        this.arrayIngredients = null;
        this.arrayIngredientsFilters = null;
        this.arrayBadge = [];
        this.model = new Model()
        this.view = new View()
    }

    async ControlAllRecipe() {
        const data = await this.model.getAllRecipe()
        this.arrayAllRecipe = data;
        this.arrayRecipeFilters = data;

        this.view.DisplayRecipes(data)
        this.ControlAllIngredients()
        this.AddEventListenerForIngredients();
    }

    async ControllSearchFilter(str) {
        const data = await this.model.getSearchFilter(this.arrayRecipeFilters, str)
        this.arrayRecipeFilters = data;
        this.view.DisplayRecipes(data)
        this.ControlAllIngredients()
        this.AddEventListenerForIngredients();
    }

    ControlAllIngredients() {
        const data = this.model.getAllIngredients(this.arrayRecipeFilters)
        if (this.arrayIngredients == null) {
            this.arrayIngredients = data
        }
        this.arrayIngredientsFilters = data
        this.view.DisplayIngredients(data);
    }

    ControlIngredientsFilter(str) {
        const data = this.model.getIngredientsFilter(this.arrayIngredientsFilters, str)
        this.view.DisplayIngredients(data);
    }

    AddEventListenerForIngredients() {
        this.arrayIngredients.forEach(element => {
            document?.getElementById(`tags_${element}`)?.addEventListener("click", () => {
                let objElement = { type: "ingredients", name: element }
                let arrayTagFilter = this.arrayBadge.filter((badge) => badge.name == objElement.name)
                if (arrayTagFilter.length == 0) {
                    this.arrayBadge.push(objElement);
                }
                this.view.DisplayBadge(this.arrayBadge)
                this.AddEventListenerForBadge()
            })

        });
    }

    AddEventListenerForBadge(){
        if(this.arrayBadge.length > 0){
            this.arrayBadge.forEach(element => {
                document.getElementById(`badge_${element.name}`)?.addEventListener("click", () => {
                    let newArray = this.arrayBadge.filter((badge) => badge.name != element.name);
                    this.arrayBadge = newArray
                    this.view.DisplayBadge(this.arrayBadge)
                    this.AddEventListenerForBadge()
                })
            });
        }

    }

}

function init() {
    const controleur = new Controleur()
    controleur.ControlAllRecipe()
    const search = document.getElementById("search")
    search.addEventListener("change", () => {
        if (search.value.length >= 3) {
            controleur.ControllSearchFilter(search.value)
        } else {
            controleur.ControlAllRecipe()
        }
    })
    const input_ingredients = document.getElementById("input_ingredients")
    input_ingredients.addEventListener("change", () => {
        if (input_ingredients.value.length >= 3) {
            controleur.ControlIngredientsFilter(input_ingredients.value)
        } else {
            controleur.ControlIngredientsFilter()
        }
    })
}

init()