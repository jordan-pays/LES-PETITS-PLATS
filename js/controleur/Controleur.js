class Controleur {

    constructor (){
        this.arrayAllRecipe = null;
        this.arrayRecipeFilters = null;
        this.arrayIngredients = null;
        this.arrayIngredientsFilters = null;
        this.arrayBadgeIngredients = [];
        this.model = new Model()
        this.view = new View()
    }

    async ControlAllRecipe() {
        const data = await this.model.getAllRecipe()
        this.arrayAllRecipe = data;
        this.arrayRecipeFilters = data;
        this.view.DisplayRecipes(data)
        this.ControlAllIngredients()
    }

    async ControllSearchFilter(str){
        const data = await this.model.getSearchFilter(this.arrayRecipeFilters,str)
        this.arrayRecipeFilters = data;
        this.view.DisplayRecipes(data)
        this.ControlAllIngredients()
    }

    ControlAllIngredients(){
        const data = this.model.getAllIngredients(this.arrayRecipeFilters)
        if(this.arrayIngredients == null){
            this.arrayIngredients=data
        }
        this.arrayIngredientsFilters = data
        this.ControlViewDisplay(data,"ingredients")
    }

    ControlIngredientsFilter(str){
        const data = this.model.getIngredientsFilter(this.arrayIngredientsFilters,str)
        this.ControlViewDisplay(data, "ingredients")
    }

    ControlCreateAdEventListener(data,arrayChange){
        data.forEach(element => {
            const dataElement = document.getElementById(element)
            dataElement.addEventListener("click",()=>{
                const index = arrayChange.indexOf(element)
                if(index == -1){
                    arrayChange.push(element)
                }else{
                    arrayChange.splice(index,1)
                }
                console.log(this.arrayBadgeIngredients)
            })
        });
    }

    ControlViewDisplay(data,type){
        switch (type) {
            case "ingredients":
                this.view.DisplayIngredients(data);
                this.ControlCreateAdEventListener(data,this.arrayBadgeIngredients)
                break;
        
            default:
            break;
        }
    }
    
    
}

function init (){
    const controleur = new Controleur()
    controleur.ControlAllRecipe()
    const search = document.getElementById("search")
    search.addEventListener("change",()=>{
        if(search.value.length >= 3){
            controleur.ControllSearchFilter(search.value)
        }else{
            controleur.ControlAllRecipe()
        }
    })
    const input_ingredients = document.getElementById("input_ingredients")
    input_ingredients.addEventListener("change",()=>{
        if(input_ingredients.value.length >= 3){
            controleur.ControlIngredientsFilter(input_ingredients.value)
        }else{
            controleur.ControlIngredientsFilter()
        }
    })
}

init()