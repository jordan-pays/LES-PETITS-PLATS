class Controleur {

    constructor() {
        this.arrayAllRecipe = null;
        this.arrayRecipeFilters = null;
        this.arrayIngredients = null;
        this.arrayIngredientsFilters = null;
        this.arrayAppareils = null;
        this.arrayAppareilsFilters = null;
        this.arrayUstensiles = null;
        this.arrayUstensilesFilters = null;
        this.arrayBadge = [];
        this.searchText = '';
        this.model = new Model()
        this.view = new View()
    }

    async ControlAllRecipe() {
        const data = await this.model.getAllRecipe()
        this.arrayAllRecipe = data;
        this.arrayRecipeFilters = data;
        this.searchText = '';
        this.view.DisplayRecipes(data)
        this.ControlAllTags()
    }

    ControlSearchFilter(str) {
        const data = this.model.getSearchFilter(this.arrayRecipeFilters, str)
        this.searchText = str;
        this.arrayRecipeFilters = data;
        this.view.DisplayRecipes(data)
        this.ControlAllTags()
    }

    ControlBadgeFilter(){
        const data = this.model.getSearchFilter(this.arrayAllRecipe, this.searchText)
        const reponse =  this.model.getBadgeFilter(data, this.arrayBadge)
        this.arrayRecipeFilters = reponse;
        this.view.DisplayRecipes(reponse)
        this.ControlAllTags()
    }

    ControlAllIngredients() {
        const data = this.model.getAllIngredients(this.arrayRecipeFilters)
        if (this.arrayIngredients == null) {
            this.arrayIngredients = data
        }
        this.arrayIngredientsFilters = data
        this.view.DisplayIngredients(data);
        this.AddEventListenerForAllTags(data,"ingredients");
    }

  

    ControlAllAppareils() {
        const data = this.model.getAllAppareils(this.arrayRecipeFilters)
        if (this.arrayAppareils == null) {
            this.arrayAppareils = data
        }
        this.arrayAppareilsFilters = data
        this.view.DisplayAppareils(data);
        this.AddEventListenerForAllTags(data,"appareils");
    }

    ControlAllUstensiles() {
        const data = this.model.getAllUstensiles(this.arrayRecipeFilters)
        if (this.arrayUstensiles == null) {
            this.arrayUstensiles = data
        }
        this.arrayUstensilesFilters = data
        this.view.DisplayUstensiles(data);
        this.AddEventListenerForAllTags(data,"ustensiles");
    }

    ControlAllTags(){
        this.ControlAllIngredients()
        this.ControlAllAppareils()
        this.ControlAllUstensiles()
    }

    ControlIngredientsFilter(str) {
        const data = this.model.getIngredientsFilter(this.arrayIngredientsFilters, str)
        this.view.DisplayIngredients(data);
        this.AddEventListenerForAllTags(data,"ingredients");
    }

    ControlAppareilsFilter(str) {
        const data = this.model.getAppareilsFilter(this.arrayAppareilsFilters, str)
        this.view.DisplayAppareils(data);
        this.AddEventListenerForAllTags(data,"appareils");
    }

  
    ControlUstensilesFilter(str) {
        const data = this.model.getUstensilesFilter(this.arrayUstensilesFilters, str)
        this.view.DisplayUstensiles(data);
        this.AddEventListenerForAllTags(data,"ustensiles");
    }

    AddEventListenerForAllTags(data,type) {
        data.forEach(element => {
            document?.getElementById(`tags_${element}`)?.addEventListener("click", () => {
                let objElement = { type: type, name: element }
                let arrayTagFilter = this.arrayBadge.filter((badge) => badge.name == objElement.name)
                if (arrayTagFilter.length == 0) {
                    this.arrayBadge.push(objElement);
                }
                this.ControlBadgeFilter()
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
                    this.ControlBadgeFilter()
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
            controleur.ControlAppareilsFilter(input_appareils.value)
        } else {
            controleur.ControlAppareilsFilter()
        }
    })

    const input_ustensiles = document.getElementById("input_ustensiles")
    input_ustensiles.addEventListener("change", () => {
        if (input_ustensiles.value.length >= 3) {
            controleur.ControlUstensilesFilter(input_ustensiles.value)
        } else {
            controleur.ControlUstensilesFilter()
        }
    })
    
}

init()