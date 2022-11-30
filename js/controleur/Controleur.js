class Controleur {

    constructor() {
        this.arrayAllRecipe = null;
        this.arrayRecipeFilters = null;
        this.arrayIngredients = null;
        this.arrayIngredientsFilters = null;
        this.arrayAppareils = null;
        this.arrayAppareilsFilters = null;
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
        this.ControlAllAppareils()
        this.AddEventListenerForIngredients();
        this.AddEventListenerForAppareils()
    }

    async ControlSearchFilter(str) {
        const data = await this.model.getSearchFilter(this.arrayRecipeFilters, str)
        this.arrayRecipeFilters = data;
        this.view.DisplayRecipes(data)
        this.ControlAllIngredients()
        this.ControlAllAppareils()
        this.AddEventListenerForIngredients();
        this.AddEventListenerForAppareils()
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

    ControlAllAppareils() {
        const data = this.model.getAllAppareils(this.arrayRecipeFilters)
        if (this.arrayAppareils == null) {
            this.arrayAppareils = data
        }
        this.arrayAppareilsFilters = data
        this.view.DisplayAppareils(data);
    }

    ControlAppareilsFilter(str) {
        const data = this.model.getAppareilsFilter(this.arrayAppareilsFilters, str)
        this.view.DisplayAppareils(data);
    }

    AddEventListenerForIngredients() {
        this.arrayIngredientsFilters.forEach(element => {
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

    AddEventListenerForAppareils() {
        this.arrayAppareilsFilters.forEach(element => {
            document?.getElementById(`tags_${element}`)?.addEventListener("click", () => {
                let objElement = { type: "appareils", name: element }
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
            controleur.ControlSearchFilter(search.value)
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
    const input_appareils = document.getElementById("input_appareils")
    input_appareils.addEventListener("change", () => {
        if (input_appareils.value.length >= 3) {
            controleur.ControlAppareilsFilter(input_ingredients.value)
        } else {
            controleur.ControlAppareilsFilter()
        }
    })
    
}

init()