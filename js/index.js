"use strict"
//& To open sideBar
$(`.sideBar .fa-bars`).on("click", function () {
    $(`.sideBar div.bg-black`).animate({ width: `300px` }, 450)
    $(`.sideBar .mainColSide`).animate({ marginLeft: `260px` }, 450)
    $(this).addClass(`d-none`)
    $(`.sideBar .fa-close`).removeClass(`d-none`)
    $(`.sideBar ul li:nth-child(1)`).animate({ top: `0%` }, 400)
    $(`.sideBar ul li:nth-child(2)`).animate({ top: `0%` }, 500)
    $(`.sideBar ul li:nth-child(3)`).animate({ top: `0%` }, 600)
    $(`.sideBar ul li:nth-child(4)`).animate({ top: `0%` }, 700)
    $(`.sideBar ul li:nth-child(5)`).animate({ top: `0%` }, 800)
})
//& To close sideBar
$(`.sideBar .fa-close`).on("click", function () {
    $(`.sideBar div.bg-black`).animate({ width: `0vw` }, 400)
    $(`.sideBar .mainColSide`).animate({ marginLeft: `0vw` }, 400)
    $(this).addClass(`d-none`)
    $(`.sideBar .fa-bars`).removeClass(`d-none`)
    $(`.sideBar ul li:nth-child(1)`).animate({ top: `200%` }, 800)
    $(`.sideBar ul li:nth-child(2)`).animate({ top: `200%` }, 700)
    $(`.sideBar ul li:nth-child(3)`).animate({ top: `200%` }, 600)
    $(`.sideBar ul li:nth-child(4)`).animate({ top: `200%` }, 500)
    $(`.sideBar ul li:nth-child(5)`).animate({ top: `200%` }, 400)
})
//? Function to closeSideBar 
function closeSideBar() {
    return ` 
    ${$(`.sideBar ul li:nth-child(1)`).animate({ top: `200%` }, 800)}
    ${$(`.sideBar ul li:nth-child(2)`).animate({ top: `200%` }, 700)}
    ${$(`.sideBar ul li:nth-child(3)`).animate({ top: `200%` }, 600)}
    ${$(`.sideBar ul li:nth-child(4)`).animate({ top: `200%` }, 500)}
    ${$(`.sideBar ul li:nth-child(5)`).animate({ top: `200%` }, 400)}
    ${$(`.sideBar .fa-bars`).removeClass(`d-none`)}
    ${$(`.sideBar .fa-close`).addClass(`d-none`)}
    ${$(`.sideBar div.bg-black`).animate({ width: `0px` }, 600)}
    ${$(`.sideBar .mainColSide`).animate({ marginLeft: `0px` }, 600)}`
}
//? Function to hidden all section
function hiddenAllSections() {
    return `
    ${$("#Home").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#categoriesList").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#Search").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#Area").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#Ingredients").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#Contact").addClass("d-none").attr({ "aria-hidden": true })}
    ${$("#ContainerDetails").addClass("d-none").attr({ "aria-hidden": true })}`
}
//? Function display some meals list in home 
async function mealsDisplayInHome() {
    $(`#loadingScreen`).fadeIn(0)
    $(`.sideBar`).removeClass(`d-none`)
    $(`#Home`).addClass(`d-none`).attr({ "aria-hidden": true })
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let data = await getFromAPI.json()
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
        <div class="gx-4" >
        <div class="prevLayer" id="${data.meals[i].idMeal}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center p-2 ">
        <p class="m-0">${data.meals[i].strMeal}</p>
        </div>
        </div>
        </div>
        </div>
        `}
    $(`#loadingScreen`).fadeOut(1000)
    $(`#Categories`).html(containerAllMeals)
    $(`#Home`).removeClass(`d-none`).attr({ "aria-hidden": false })
    $(`.mainColSide`).animate({ marginLeft: 0 }, 700)
}
mealsDisplayInHome()
//? Function to getDetails meal (Area,Name,Tags,Recipes,Source,Youtube)
async function getAllListMeals(nameMeal) {
    hiddenAllSections()
    $(`#loadingScreen0`).show()
    closeSideBar()
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`)
    let data = await getFromAPI.json()
    $(`#loadingScreen0`).fadeOut(300)
    $(`#ContainerDetails`).removeClass(`d-none`).attr({ "aria-hidden": false })
    console.log(data);
    let tagsHtml = ``
    let containerRecipes = ``
    for (let i = 1; i < 100; i++) {
        let RecipesConcatenate = data.meals[0][`strMeasure` + [i]] + data.meals[0][`strIngredient` + [i]]
        if (RecipesConcatenate !== "" && RecipesConcatenate !== " ") {
            containerRecipes += `
        <span class="bg-info-subtle px-2 fs-6 py-1 rounded-1 m-1 text-info-emphasis">${RecipesConcatenate}</span>`
        } else {
            break;
        }
    }
    if (data.meals[0].strTags !== null) {
        const arrayTags = [...data.meals[0].strTags.split(`,`)]
        for (let i = 0; i < arrayTags.length; i++) {
            tagsHtml += `<span class="alert alert-danger px-2 fs-6 py-1 rounded-1 text-info-emphasis">${arrayTags[i]}</span>`
        }
    }
    $(`#detailsThisMeals`).html(`
    <div class="col-12 col-md-4 ps-3 ps-sm-4 ps-md-5 pe-0 overflow-hidden rounded-2">
    <div class="">
    <img src="${data.meals[0].strMealThumb}" class="w-100" alt="">
    </div>
    <h2 class="h3 fw-bold mt-2 text-white">${data.meals[0].strMeal}</h2>
    </div>
    <div class="col-12 col-md-8 ps-3 ps-sm-4 ps-md-4 mt-3 mt-md-0 text-white">
    <h2 class="h3">Instructions</h2>
    <p>${data.meals[0].strInstructions}</p>
    <h2 class="h3">Area : ${data.meals[0].strArea}</h2>
    <h2 class="h3">Category : ${data.meals[0].strCategory}</h2>
                <h2 class="h3">Recipes :</h2>
                <div class="d-flex flex-wrap gap-2">
                ${containerRecipes}    
                </div>
                <h2 class="mt-4 h3">Tags :</h2>
                <div class="d-flex flex-wrap gap-2">
                ${tagsHtml || " "}
                </div>
                <div class="buttons mt-4"><button class="btn btn-success"><a target="_blank" href="${data.meals[0].strSource}">Source</a></button> <button
                class="btn btn-danger" type="button"><a target="_blank" href="${data.meals[0].strYoutube}">Youtube</a></button></div>
                </div>
                `)
}
$("#Categories").delegate("div.prevLayer", "click", function () {
    const currentDiv = "#" + $(this).attr(`id`)
    const mealName = $(`${currentDiv} p`).html()
    getAllListMeals(mealName)
});
//^ Start section search
//? Function to getCategories by name in search
async function getCategoryByName(NameMeal) {
    $(`#loadingScreen1`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${NameMeal}`)
    let data = await getFromAPI.json()
    $(`#loadingScreen1`).fadeOut(300)
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
        <div class="gx-4" id="${data.meals[i].idMeal}">
        <div class="prevLayer">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center p-2 ">
        <p class="m-0">${data.meals[i].strMeal}</p>
        </div>
        </div>
        </div>
        </div>
        `
    }
    $(`#mealsBySearch`).html(containerAllMeals)
    $("#Search").delegate("div.gx-4", "click", function () {
        const currentDiv = "#" + $(this).attr(`id`)
        const mealName = $(`${currentDiv} p`).html()
        getAllListMeals(mealName)
    });
}
//? Function to getCategories by one letter in search
async function getCategoryByLetter(NameMeal) {
    $(`#loadingScreen1`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${NameMeal}`)
    let data = await getFromAPI.json()
    $(`#loadingScreen1`).fadeOut(300)
    console.log(data);
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
        <div class="gx-4" >
        <div class="prevLayer" id="${data.meals[i].idMeal}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center p-2 ">
        <p class="m-0">${data.meals[i].strMeal}</p>
        </div>
        </div>
        </div>
        </div>
        `
    }
    $(`#mealsBySearch`).html(containerAllMeals)
}
$("#Search").delegate("div.prevLayer", "click", function () {
    const currentDiv = "#" + $(this).attr(`id`)
    const mealName = $(`${currentDiv} p`).html()
    getAllListMeals(mealName)
});
$(`#searchByName`).on("input", function () {
    getCategoryByName($(this).val())
})
$(`#searchByFirstLetter`).on("input", function () {
    if ($(this).val() === " ") {
        $(`#mealsBySearch`).html("")
        $(`#loadingScreen1`).fadeIn(0)
        $(`#loadingScreen1`).fadeOut(400)
    } else {
        getCategoryByLetter($(this).val() === "" ? 'a' : $(this).val())
    }
})
$(".sideBar ul li:first-child").on("click", function () {
    $("#mealsBySearch").html("")
    $("#Search input").val("")
    hiddenAllSections()
    $("#Search").removeClass("d-none").attr({ "aria-hidden": false })
    closeSideBar()
})
// ^ Start section categories
//? Function to display some food
async function listMeals() {
    $(`#loadingScreen6`).fadeIn(0)
    hiddenAllSections()
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    let data = await getFromAPI.json()
    console.log(data);
    $(`#loadingScreen6`).fadeOut(300)
    $(`#categoriesList`).removeClass(`d-none`).attr({ "aria-hidden": false })
    let containerAllMeals = ` `
    for (let i = 0; i < data.categories.length; i++) {
        containerAllMeals += `
        <div class="gx-4">
        <div class="prevLayer" id="${data.categories[i].idCategory}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.categories[i].strCategoryThumb}" class="w-100" alt="${data.categories[i].strMeal}">
        <div
        class="over-lay overflow-hidden text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center flex-column p-2 ">
        <h2 class="m-0">${data.categories[i].strCategory}</h2>
        <p class="m-0 fs-8 overflow-hidden text-center">${data.categories[i].strCategoryDescription.split(" ").slice(0, 25).join().replaceAll(`,`, ` `)}</p>
        </div>
        </div>
        </div>
        </div>
        `
    }
    $(`#meals`).html(containerAllMeals)
}
$("#meals").delegate("div.prevLayer", "click", function () {
    const currentDiv = "#" + $(this).attr(`id`)
    console.log(currentDiv);
    const mealName = $(`${currentDiv} h2`).html()
    mealsSimilar(mealName)
});
//? Function to getCategories Similar when click on food
async function mealsSimilar(nameMeal) {
    $(`#loadingScreen3`).fadeIn(0)
    $(`#meals`).addClass(`d-none`).attr({ "aria-hidden": true })
    $(`#meals2`).removeClass(`d-none`).attr({ "aria-hidden": true })
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${nameMeal}`)
    let data = await getFromAPI.json()
    $(`#loadingScreen3`).fadeOut(300)
    $(`#categoriesList`).removeClass(`d-none`).attr({ "aria-hidden": false })
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
        <div class="gx-4">
        <div class="prevLayer" id="${data.meals[i].idMeal}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay overflow-hidden text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center p-2 ">
        <h2 class="m-0">${data.meals[i].strMeal}</h2>
        </div>
        </div>
        </div>
        </div>
        `
    }
    $(`#meals2`).html(containerAllMeals)
}
$("#meals2").delegate("div.prevLayer", "click", function () {
    const currentDiv = "#" + $(this).attr(`id`)
    console.log(currentDiv);
    const mealName = $(`${currentDiv} h2`).html()
    getAllListMeals(mealName)
});
$(".sideBar ul li:nth-child(2)").on("click", function () {
    $(`#meals`).html(`
    <div id="loadingScreen2" class="bg-black position-absolute top-0 bottom-0 start-0 end-0 z-3 " style="display: none;">
        <div class="loader" style="scale: 1.5;translate: 37vw 40vh;"></div>
    </div>`)
    $(`#meals2`).html(`
    <div id="loadingScreen3" class="bg-black position-absolute top-0 bottom-0 start-0 end-0 z-3 " style="display: none;">
        <div class="loader" style="scale: 1.5;translate: 37vw 40vh;"></div>
    </div>`)
    hiddenAllSections()
    $(`#categoriesList`).removeClass(`d-none`).attr({ "aria-hidden": false })
    $(`#meals2`).addClass(`d-none`).attr({ "aria-hidden": true })
    $(`#meals`).removeClass(`d-none`).attr({ "aria-hidden": false })
    listMeals()
    closeSideBar()
})
// ^ Start ===> section Area
//? Function to display all countries available
async function CountriesName() {
    $(`#loadingScreen4`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a`)
    let data = await getFromAPI.json()
    console.log(data);
    $(`#loadingScreen4`).fadeOut(300)
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
<div class="gx-4 text-white">
                    <div class="countryName overflow-hidden cursor-pointer position-relative d-flex justify-content-center align-items-center flex-column rounded-2" id="${data.meals[i].strArea}">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>                   
                    <h2 class="m-0 fs-3 text-center">${data.meals[i].strArea}</h2>                    
                    </div>
                    </div>
        `}
    $(`#Countries`).html(containerAllMeals)
}
//? Function to get Famous food in the country
async function CountriesMeals(Country) {
    $(`#Countries`).html("")
    $(`#loadingScreen4`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${Country}`)
    let data = await getFromAPI.json()
    console.log(data);
    $(`#loadingScreen4`).fadeOut(300)
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
<div class="gx-4" >
        <div class="prevLayer" id="${data.meals[i].strMeal}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center p-2 ">
        <p class="m-0 style="line-height: 1;"">${data.meals[i].strMeal}</p>
        </div>
        </div>
                            </div>
                            </div>
        `}
    $(`#Countries`).html(containerAllMeals)
};
$("#Countries").delegate("div.gx-4 .countryName", "click", function () {
    console.log(this);
    const currentName = $(this).attr(`id`)
    CountriesMeals(currentName)
});
$("#Countries").delegate("div.prevLayer", "click", function () {
    const currentName = $(this).attr(`id`)
    getAllListMeals(currentName)
});
$(".sideBar ul li:nth-child(3)").on("click", function () {
    hiddenAllSections()
    $(`#Area`).removeClass(`d-none`).attr({ "aria-hidden": false })
    closeSideBar()
    CountriesName()
})
//^ Start ===> section Ingredients
//? Function to get  typs of foods
async function IngredientsMeals() {
    $(`#NameIngredients`).html("")
    $(`#loadingScreen5`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await getFromAPI.json()
    $(`#loadingScreen5`).fadeOut(300)
    let containerAllMeals = ` `
    for (let i = 0; i < 20; i++) {
        containerAllMeals += `
<div class="gx-4">
    <div class="idIngredient text-white cursor-pointer d-flex flex-column align-items-center" id="${data.meals[i].strIngredient}">
        <div><i class="fa-solid text-white fa-drumstick-bite fa-4x"></i></div>
            <h2 class="m-0 fs-4 text-center">${data.meals[i].strIngredient}</h2>
            <p class="m-0 mt-1 fs-7 overflow-hidden text-center">${data.meals[i].strDescription.split(" ").slice(0, 20).join().replaceAll(`,`, ` `)}</p>
        </div>
</div>`}
    $(`#NameIngredients`).html(containerAllMeals)
}
//? Function to get meals similar when click on type of foods
async function mealsSimilarIngredient(nameMeal) {
    $(`#NameIngredients`).html("")
    $(`#loadingScreen5`).fadeIn(0)
    let getFromAPI = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${nameMeal}`)
    let data = await getFromAPI.json()
    $(`#loadingScreen5`).fadeOut(300)
    let containerAllMeals = ` `
    for (let i = 0; i < data.meals.length; i++) {
        containerAllMeals += `
<div class="gx-4" >
        <div class="prevLayer" id="${data.meals[i].strMeal}">
        <div class="overflow-hidden cursor-pointer position-relative rounded-2">
        <img src="${data.meals[i].strMealThumb}" class="w-100" alt="${data.meals[i].strMeal}">
        <div
        class="over-lay text-black fs-3 fw-semibold position-absolute top-0 bottom-0 start-0 end-0 d-flex align-items-center justify-content-center p-2 ">
        <p class="m-0" style="line-height: 1;">${data.meals[i].strMeal}</p>
        </div>
        </div>
                            </div>
                            </div>`}
    $(`#NameIngredients`).html(containerAllMeals)
}
$("#NameIngredients").delegate("div.prevLayer", "click", function () {
    const currentName = $(this).attr(`id`)
    getAllListMeals(currentName)
});
$("#NameIngredients").delegate("div.idIngredient", "click", function () {
    const currentName = $(this).attr(`id`)
    mealsSimilarIngredient(currentName)
});
$(".sideBar ul li:nth-child(4)").on("click", function () {
    hiddenAllSections()
    $(`#Ingredients`).removeClass(`d-none`).attr({ "aria-hidden": false })
    closeSideBar()
    IngredientsMeals()
})
//^ Start ===> section contact <===
$(".sideBar ul li:last-child").on("click", function () {
    hiddenAllSections()
    $(`#Contact`).removeClass(`d-none`).attr({ "aria-hidden": false })
    closeSideBar()
});
// ===> My regex input
const regexName = /^[a-zA-Z ]+$/
const regexEmail = /[^@()\s]+@[^@()\s]+\.[^@()\s]+/
const regexPhoneNumber = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const regexAge = /^(?:[0-9]|[1-9][0-9])$/
const regexPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
// ===> Validation
$(`#Contact form input`).on("input", function () {
    if ($(this).attr(`placeholder`) === $(`input[placeholder="Enter Your Name"]`).attr(`placeholder`)) {
        regexName.test($(`input[placeholder="Enter Your Name"]`).val()) ? $(this).next().addClass(`d-none`).attr({ "aria-hidden": true }) : $(this).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
    if ($(this).attr(`placeholder`) === $(`input[placeholder="Enter Your Email"]`).attr(`placeholder`)) {
        regexEmail.test($(`input[placeholder="Enter Your Email"]`).val()) ? $(this).next().addClass(`d-none`).attr({ "aria-hidden": true }) : $(this).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
    if ($(this).attr(`placeholder`) === $(`input[placeholder="Enter Your Phone"]`).attr(`placeholder`)) {
        regexPhoneNumber.test($(`input[placeholder="Enter Your Phone"]`).val()) ? $(this).next().addClass(`d-none`).attr({ "aria-hidden": true }) : $(this).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
    if ($(this).attr(`placeholder`) === $(`input[placeholder="Enter Your Age"]`).attr(`placeholder`)) {
        regexAge.test($(`input[placeholder="Enter Your Age"]`).val()) ? $(this).next().addClass(`d-none`).attr({ "aria-hidden": true }) : $(this).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
    if ($(this).attr(`placeholder`) === $(`input[placeholder="Enter Your Password"]`).attr(`placeholder`)) {
        regexPassword.test($(`input[placeholder="Enter Your Password"]`).val()) ? $(this).next().addClass(`d-none`).attr({ "aria-hidden": true }) : $(this).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
    ValidationAll() ? $(`#Contact form button`).removeAttr(`disabled`) : $(`#Contact form button`).prop(`disabled`, true)
    if ($(`input[placeholder="Enter Your Password"]`).val() === $(`input[placeholder="Repassword"]`).val()) {
        $(`input[placeholder="Repassword"]`).next().addClass(`d-none`).attr({ "aria-hidden": true })
    } else {
        $(`input[placeholder="Repassword"]`).next().removeClass(`d-none`).attr({ "aria-hidden": false })
    }
})
//? Function to test all input
function ValidationAll() {
    if (regexName.test($(`input[placeholder="Enter Your Name"]`).val()) && regexEmail.test($(`input[placeholder="Enter Your Email"]`).val()) && regexPhoneNumber.test($(`input[placeholder="Enter Your Phone"]`).val()) && regexAge.test($(`input[placeholder="Enter Your Age"]`).val()) && regexAge.test($(`input[placeholder="Enter Your Age"]`).val()) && regexPassword.test($(`input[placeholder="Enter Your Password"]`).val()) && $(`input[placeholder="Enter Your Password"]`).val() === $(`input[placeholder="Repassword"]`).val()) {
        return true
    }
}