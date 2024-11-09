const searchBox= document.querySelector('.searchBox');
const searchBtn= document.querySelector('.searchBtn');
 const recipeContainer= document.querySelector('.recipe-container');
 const recipeDetailsContent= document.querySelector('.recipe-details-content');
 const recipeCloseBtn= document.querySelector('.recipe-close-btn');

const fetchRecipes= async (query)=>{
    recipeContainer.innerHTML="<h2>Fetchig Recipes...</h2>";
    try{
 const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
 const response=  await data.json();
 console.log(response);
 
 recipeContainer.innerHTML="";

 response.meals.forEach(meal => {
    console.log(meal);
    
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML=`
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p> <span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span></p>
    `
   const button= document.createElement('button');
   button.textContent="View Recipe";
   recipeDiv.appendChild(button);


   button.addEventListener("click", ()=>{
      openRecipePopup(meal);
   })
    recipeContainer.appendChild(recipeDiv);
 });
}
catch(error){
   recipeContainer.innerHTML="<h2>Error in Fetching Recipes....</h2>";
}
}

const fetchIngredients =(meal)=>{
    let IngredentList ="";
    for(let i=1;i<=20;i++){
      const Ingredent = meal[`strIngredient${i}`];
      if(Ingredent){
         const measure =meal[`strMeasure${i}`];
         IngredentList  +=`<li>${measure} ${Ingredent}</li>`
      }else{
         break;
      }
    }
    return IngredentList;
}

const openRecipePopup=(meal)=>{
   recipeDetailsContent.innerHTML=`
   <h2 class="recipeName">${meal.strMeal}</h2>
   <h3>Ingredents:</h3>
   <ul class="ingredientList">${fetchIngredients(meal)}</ul>
   <div>
   <h3> Instruction:</h3>
   <p class="recipeInstructions"> ${meal.strInstructions}</p>
   </div>
   `

   recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener("click", (e)=>{
   recipeDetailsContent.parentElement.style.display="none";
})

 searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
      recipeContainer.innerHTML=`<h2>Type the meal in the search box</h2>`
      return;
    }
    fetchRecipes(searchInput);

 })

 