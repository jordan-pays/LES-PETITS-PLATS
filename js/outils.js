const button_ingredients = document.getElementById("button_ingredients")
const container_info_ingredients = document.getElementById("container_info_ingredients")
const chevron_ingredients = document.getElementById("chevron_ingredients")
button_ingredients.addEventListener("click",()=>{
    container_info_ingredients.setAttribute("style","display:block")
})

chevron_ingredients.addEventListener("click",()=>{
    container_info_ingredients.setAttribute("style","display:none")
})

var input = document.getElementById('input_ingredients'); // get the input element
input.addEventListener('change', resizeInput); // bind the "resizeInput" callback on "input" event
resizeInput.call(input); // immediately call the function

function resizeInput() {
  this.style.width = (this.value.length <= 3 ? 120 : this.value.length + 4)+ "ch";
}