console.log('meal works');

const loadMeals = (searchText) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals))
    .catch((error)=> console.log(error))
};

const displayMeal = (meals) =>{
    console.log(meals);
    const mealsContainer = document.getElementById("meal-container");
    mealsContainer.innerHTML = "";
    meals.forEach((meal) => {
        console.log(meal);
        const mealDiv = document.createElement("div");
        mealDiv.classList.add("col-10");
        mealDiv.classList.add("col-md-6");
        mealDiv.classList.add("mx-auto");
        mealDiv.classList.add("my-5");
        mealDiv.classList.add("shadow-sm");
        mealDiv.classList.add("p-3");

        mealDiv.innerHTML = `
        <div class="row" id="meal-container">
    <div class="col-10 mx-auto  col-lg-6">
      <img class="img-fluid tasty-card-img" src="${meal.strMealThumb}" alt="">
    </div>
    <div class="col-8 my-3 my-lg-0  col-lg-6 mx-auto d-flex align-items-center">
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>
        <p onclick="loadSingleMeal(${meal.idMeal})" class="tasty-single-btn fw-semibold" href="" data-bs-toggle="modal" data-bs-target="#mealDetails">View Details</p>
      </div>
    </div>
  </div>
        `;
        mealsContainer.appendChild(mealDiv);
    })
} 

// Single Meals
const loadSingleMeal = async (idMeal) => {
  try{
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealDetails(data.meals[0])
  }
  catch(error){
    console.log(error);
  }
  
};


const searchMeals = () => {
  const searchText = document.getElementById("search-field").value;
  // Search Meal
  console.log(searchText);
  loadMeals(searchText);
};

// Single Meal details
const displayMealDetails = (meal) => {
    console.log(meal);
    document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
    const mealsDetails = document.getElementById("mealDetailsBody");
    mealsDetails.innerHTML = `
    <img class="img-fluid modal-img mb-3" src="${meal.strMealThumb}" >
    <p> <strong>Category : </strong> ${meal.strCategory} </p>
    <p> <strong>Area : </strong> ${meal.strArea} </p>
    <p> <strong>Instructions : </strong> ${meal.strInstructions} </p>
    <p> <strong>Tags : </strong> ${meal.strTags? meal.strTags: 'No Tags Available' } </p>
    <p> <strong>Youtube : </strong> ${meal.strYoutube} </p>
    `;
}



loadMeals("d");