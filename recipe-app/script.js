
// references
const mealsEl = document.getElementById('meals');
const favouriteContainer = document.getElementById('fav-meals'); 
const searchTerm = document.getElementById('search-term');
const searchBtn = document.getElementById('search');
const mealPopup = document.getElementById('meal-popup');
const popupCloseBtn = document.getElementById('close-popup');
const mealInfoEl = document.getElementById('meal-info');


getRandomMeals();
fetchFavMeals();

// Get Random Meals
async function getRandomMeals() {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        console.log(responseData);

        const randomMeal = responseData.meals[0];
        console.log(randomMeal);
        
        addMeal(randomMeal, true);
    } catch(error) {
        console.log(error);
    }
}

// Get Meals by ID
async function getMealsById(id) {
    try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=' + id);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const responseData = await response.json();
        const meal = responseData.meals[0];
        return meal;

    } catch(error) {
        console.log(error);
    }

}

// Get Meals By Search
async function getMealsBySearch(term) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=' + term); 
        const responseData = await response.json();
        const meals = responseData.meals;
        return meals;
}

// Add Random Meal to the 'Random Recipe' Div
function addMeal(mealData, random = false){
    console.log(mealData);
    const meal = document.createElement('div');
    meal.classList.add('meal');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">Random Recipe</span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn"><i class="fas fa-heart"></i></button>
        </div>
    `;
    const btn = meal.querySelector('.meal-body .fav-btn');
    btn.addEventListener('click', () => {
        if (btn.classList.contains('active')) {
            removeMealLS(mealData.idMeal);
            btn.classList.remove('active');

        } else {
            addMealLS(mealData.idMeal);
            btn.classList.add('active');
        }
        fetchFavMeals();
    });
    meal.addEventListener('click', () => {
        showMealInfo(mealData);
    });
      
    meals.appendChild(meal);
} 

// Add Meal to Local Storage
function addMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]));
}


// Remove Meal from Local Storage
function removeMealLS(mealId) {
    const mealIds = getMealLS();
    localStorage.setItem('mealIds', JSON.stringify(mealIds.filter((id) => id !== mealId)));
}


// Get Meal from Local Storage
function getMealLS() {
    const mealIds = JSON.parse(localStorage.getItem('mealIds'));

    return mealIds === null ? [] : mealIds;
}

// Fetch Your Favourite Meal
async function fetchFavMeals() {
    // Clean the container
    favouriteContainer.innerHTML = '';

    const mealIds = getMealLS();

    for(let i=0; i<mealIds.length; i++) {
        const mealId = mealIds[i];
        meal = await getMealsById(mealId);
        addMealFav(meal);
    }
    console.log(meals);
}

// Add meal to favourite
function addMealFav(mealData){
    const favMeal = document.createElement('li');
    favMeal.innerHTML = `
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <span>${mealData.strMeal}</span>
        <button class='clear'><i class="fas fa-window-close"></i></button>
    `;
    const btn = favMeal.querySelector('.clear');
    btn.addEventListener('click', () => {
         removeMealLS(mealData.idMeal);
         fetchFavMeals();
    });
    favMeal.addEventListener('click', () => {
        showMealInfo(mealData);
    });
    favouriteContainer.appendChild(favMeal);
} 

// show meal info
function showMealInfo(mealData) {
    // clean it up first
    mealInfoEl.innerHTML = ''
    // update the meal info
    const mealEl = document.createElement('div');

    const ingredients = [];
    // get ingredients and measures
    for(let i=1; i<=20; i++) {
        if (mealData['strIngredient'+i]) {
            ingredients.push(`${mealData['strIngredient'+i]} - ${mealData['strMeasure'+i]}`);
        } else {
            break;
        }

    }
    mealEl.innerHTML = `
        <h1>${mealData.strMeal}</h1>
        <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        <p>${mealData.strInstructions}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${ingredients.map((ing) => `<li>${ing}</li>`).join('')}
        </ul>
    `;
    mealInfoEl.appendChild(mealEl);

    // show the popup
    mealPopup.classList.remove('hidden');

}

// Search Meal
searchBtn.addEventListener('click', async () => {
    // clean the container
    mealsEl.innerHTML = '';
    const search = searchTerm.value;

   const meals = await getMealsBySearch(search);
   if (meals) {

       meals.forEach((meal) => {
           addMeal(meal);
        });
    }
});    



popupCloseBtn.addEventListener('click', () => {
    mealPopup.classList.add('hidden'); // hide popup
})