
const loadMeals = (searchText, dataLimit) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeal(data.meals, dataLimit))
    .catch((error)=> console.log(error))
};

const displayMeal = (meals, dataLimit) =>{
    // console.log(meals);
    const mealsContainer = document.getElementById("meal-container");
    const showAll = document.getElementById("show-all");
    mealsContainer.innerHTML = "";


    // Display Search Not Found
    const notFoundMessage = document.getElementById("not-found-message");
    const yourFavoriteFood = document.getElementById("your-favorite-food");
    if( !meals || meals === null){
      notFoundMessage.classList.remove("d-none");
      yourFavoriteFood.classList.add('d-none');
      showAll.classList.add("d-none");
      toggleSpinner(false);
    }
    else{
      yourFavoriteFood.classList.remove("d-none");
      notFoundMessage.classList.add("d-none");
    }
    // Display All Phones
    // Display 10 meals
    
    if(dataLimit && meals.length > 8){
      meals = meals.slice(0, 8)
      showAll.classList.remove('d-none');
    }
    else{
      showAll.classList.add('d-none')
    }
    meals.forEach((meal) => {
        // console.log(meal);
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
    // Loader Spinner Stop
    toggleSpinner(false)
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

// Search Items
const searchMeals = () => {
  processSearch(10);
};

// Single Meal details
const displayMealDetails = (meal) => {
    console.log(meal);
    document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
    const mealsDetails = document.getElementById("mealDetailsBody");
    mealsDetails.innerHTML = `
    <img class="img-fluid modal-img mb-3" src="${meal.strMealThumb}" >
    <p> <strong>Category : </strong> ${
      meal.strCategory ? meal.strCategory : "No Category Available"
    } </p>
    <p> <strong>Area : </strong> ${
      meal.strArea ? meal.strArea : "No Area Available"
    } </p>
    <p> <strong>Instructions : </strong> ${
      meal.strInstructions ? meal.strInstructions : "No Instructions Available"
    } </p>
    <p> <strong>Tags : </strong> ${
      meal.strTags ? meal.strTags : "No Tags Available"
    } </p>
    <a class="nav-link" href="${
      meal.strYoutube
    }" target="_blank"> <strong>Youtube : </strong> <span class="modal-link">${
      meal.strYoutube ? meal.strYoutube : "No Youtube Available"
    } </span></a>
    `;
}


// Loader Spinner 
const toggleSpinner = isLoading => {
  const loaderSpinner = document.getElementById("loader-spinner");
  if(isLoading){
    loaderSpinner.classList.remove('d-none')
  }
  else{
    loaderSpinner.classList.add("d-none");
  }
}



// Not the best way to load Show all data
document.getElementById('btn-show-all').addEventListener('click', function(){
  processSearch();
})


// Process Search 
const processSearch = (dataLimit) => {
  toggleSpinner(true);
  const searchText = document.getElementById("search-field").value;
  // Search Meal
  console.log(searchText);
  loadMeals(searchText, dataLimit);
}

loadMeals("a", 8);