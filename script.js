document.querySelector('#search-btn').addEventListener('click', () => {
    const inputValue = document.getElementById('input').value;
    if (inputValue.length === 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue[0]}`)
            .then(response => response.json())
            .then(data => {
                for (let i = 0; i < data.meals.length; i++) {
                    const foodName = data.meals[i].strMeal;
                    const thumbImg = data.meals[i].strMealThumb;
                    displayFoodItems(foodName, thumbImg);
                }

            })
    }
    else if (inputValue.length > 1) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
            .then(response => response.json())
            .then(data => {
                if (data.meals === null) {
                    alert(`Sorry! ${inputValue} is not Available.`);
                }
                else {
                    for (let i = 0; i < data.meals.length; i++) {
                        const foodName = data.meals[i].strMeal;
                        const thumbImg = data.meals[i].strMealThumb;
                        displayFoodItems(foodName, thumbImg);
                    }
                }
            })
    }
    document.querySelector('.image-container').innerHTML = '';
    document.querySelector('.info-container').innerHTML = '';
});


const displayFoodItems = (foodName, thumbImg) => {

    let imageContainerDiv = document.querySelector('.image-container');
    imageContainerDiv.innerHTML +=
        `<div class="card">
        <div class="item">
            <img src=${thumbImg} class="food-img">
            <p class="food-name">${foodName}</p>
        </div>
    </div>`;

    const allCards = document.querySelectorAll('.card');
    for (let i = 0; i < allCards.length; i++) {
        const card = allCards[i];
        card.addEventListener('click', function () {
            const infoFoodName = this.querySelector('.card .food-name').innerText;
            const infoImg = this.querySelector('.card img').src;

            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${infoFoodName}`)
                .then(response => response.json())
                .then(data => {
                    const meals = data.meals;
                    const infoContainer = document.querySelector('.info-container');
                    const list = document.createElement('ul');
                    const filterItem = meals.filter(x => x.strMeal === infoFoodName);

                    for (let i = 1; i < 21; i++) {
                        const element = filterItem[0][`strIngredient${i}`];
                        if (element !== "" && element !== null) {
                            list.innerHTML +=
                                `<li>${element}</li>`;
                        }
                    }

                    document.querySelector('.info-container').innerHTML =
                        `<div class="info-img">
                            <img src=${infoImg}>
                        </div>
                        <h2 class="info-food-name">${infoFoodName}</h2>
                        <h3>Ingredients:</h3>
                        `;
                    infoContainer.appendChild(list);
                })
            scrollToTheTop();
        });


    }

}

const scrollToTheTop = () => {
    var elem = document.querySelector(".info-img");
    elem.scrollIntoView();
} 
