const searchBox=document.querySelector('.searchBox')
const searchBtn=document.querySelector('.searchBtn')
const recipeContainer=document.querySelector('.recipe-container')
const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipecloseBtn=document.querySelector('.recipe-close-btn')


const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>"
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response=await data.json()
    recipeContainer.innerHTML="";
    response.meals.forEach((meal)=>{
        const recipeDiv=document.createElement('div')
        recipeDiv.classList.add('recipe')
        recipeDiv.innerHTML=`
        <img src='${meal.strMealThumb}'>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span></p>
        `
        const button=document.createElement('button');
        button.classList.add('viewbtn')
        button.innerText="View Recipe"
        recipeDiv.appendChild(button)
        recipeContainer.appendChild(recipeDiv)
        button.addEventListener('click',()=>{
            openRecipePopup(meal)
        })
    })
    
}


 searchBtn.addEventListener('click',(e)=>{
    e.preventDefault()
    const searchInput=searchBox.value.trim();
    fetchRecipes(searchInput)
 })
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`]
        if(ingredient){
            const measure=meal[`strMeasure${i}`]
            ingredientsList+=`<li>${i} ${measure} ${ingredient}</li>`
           
        }
        else{
            break;
        }
    }
    
    return ingredientsList;
}
 const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h3>${meal.strMeal}</h3>
    <h3>Ingredents</h3>
    <ul>${fetchIngredients(meal)}</ul>
    <br>
    <h3>Instructions</h3>
    `
    const p=document.createElement('p')
    p.innerText=meal.strInstructions
    recipeDetailsContent.append(p)
recipeDetailsContent.parentElement.style.display='block'
 }

recipecloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display='none';
})