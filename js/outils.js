const button_ingredients = document.getElementById("button_ingredients")
const container_info_ingredients = document.getElementById("container_info_ingredients")
const chevron_ingredients = document.getElementById("chevron_ingredients")
const button_appareils = document.getElementById("button_appareils")
const container_info_appareils = document.getElementById("container_info_appareils")
const chevron_appareils = document.getElementById("chevron_appareils")
const button_ustensiles = document.getElementById("button_ustensiles")
const container_info_ustensiles = document.getElementById("container_info_ustensiles")
const chevron_ustensiles = document.getElementById("chevron_ustensiles")

button_ingredients.addEventListener("click",()=>{
    container_info_ingredients.setAttribute("style","display:block")
    container_info_appareils.setAttribute("style","display:none")
    container_info_ustensiles.setAttribute("style","display:none")
})

chevron_ingredients.addEventListener("click",()=>{
    container_info_ingredients.setAttribute("style","display:none")
})

button_appareils.addEventListener("click",()=>{
  container_info_appareils.setAttribute("style","display:block")
  container_info_ingredients.setAttribute("style","display:none")
  container_info_ustensiles.setAttribute("style","display:none")
})

chevron_appareils.addEventListener("click",()=>{
  container_info_appareils.setAttribute("style","display:none")
})

button_ustensiles.addEventListener("click",()=>{
  container_info_ustensiles.setAttribute("style","display:block")
  container_info_ingredients.setAttribute("style","display:none")
  container_info_appareils.setAttribute("style","display:none")
})

chevron_ustensiles.addEventListener("click",()=>{
  container_info_ustensiles.setAttribute("style","display:none")
})

function resizeInput() {
  this.style.width = (this.value.length <= 3 ? 120 : this.value.length + 4)+ "ch";
}