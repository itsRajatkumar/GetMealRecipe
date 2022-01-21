const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-detail-content')
const RecipeCloseBtn = document.getElementById('recipe-close-btn');

// event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click',getMealRecipe)
RecipeCloseBtn.addEventListener('click', ()=>{
    mealDetailsContent.parentElement.classList.remove('show-recipe')
});


// get meal lis that matches with the ingredients
function getMealList(){
    let searchInputTxt = document.getElementById('search-input').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html = html +`
                <div class="meal-item" data-id = ${meal.idMeal}>
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                    </div>
            </div>
                `
            });
            mealList.classList.remove('notFound')
        }else{
            html = "Sorry, We didn't Find any Meal"
            mealList.classList.add('notFound')
        }
        mealList.innerHTML = html
    })
}


function getMealRecipe(e){
    e.preventDefault()
    if( e.target.classList.contains("recipe-btn")){
        let mealItem = e.target.parentElement.parentElement
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response =>response.json())
        .then(data => mealRecipeModel(data.meals))
    }
}

function mealRecipeModel(meal){
    meal = meal[0]
    let html =  `
                        <h2 class="recipe-title">${meal.strMeal}</h2>
                        <p class="recipe-category">${meal.strCategory}</p>
                        <div class="recipe-instruct">
                            <h2>Instruction:</h2>
                            <p>${meal.strInstructions}</p>
                        </div>
                        <div class="recipe-meal-img">
                            <img src="${meal.strMealThumb}" alt="">
                        </div>
                        <div class="recipe-link">
                            <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
                        </div>
    `
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('show-recipe')
}