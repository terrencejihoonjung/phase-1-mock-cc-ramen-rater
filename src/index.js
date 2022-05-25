//DONE
/*
What to find a way to not make the code redundant, but it is difficult because 
I'm working with a DB and a form input. I feel like I would need to know how to push information
to my database to make this less redundant. 
*/

//Global Initializations
const ramenMenu = document.querySelector("#ramen-menu");
const ramenDetail = document.querySelector("#ramen-detail");
const ramenRating = document.querySelector("#rating-display");
const ramenComment = document.querySelector("#comment-display");
const form = document.querySelector("#new-ramen");

//ADD RAMEN IMAGES TO DOM 
//Fetch data from server
fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => addRamenImage(ramens));

//Iterate through each ramen item, grab their image URL, create an image element and add to the ramen-menu div
function addRamenImage(ramens) {
    ramens.forEach(ramen => {
        const imageURL = ramen.image;
        const ramenImage = document.createElement("img");
        ramenImage.src = imageURL;
        ramenMenu.append(ramenImage);

        //Listen for a click event to display ramen information
        ramenImage.addEventListener("click", function(e) {
            const img = ramenDetail.querySelector("img")
            img.src = ramen.image;
            img.alt = ramen.name;

            const name = ramenDetail.querySelector("h2");
            name.textContent = ramen.name;

            const restaurant = ramenDetail.querySelector("h3");
            restaurant.textContent = ramen.restaurant;

            ramenRating.textContent = ramen.rating;
            ramenComment.textContent = ramen.comment;
        })
    });
}

//listen for a submit event to call addItem
form.addEventListener("submit", addItem);

//Add items submitted in the form to db.json
function addItem(e) {
    e.preventDefault();
    buildAndAddRamen(e.target);
}

//Take form image url information and add the image to the menu
function buildAndAddRamen(formInfo) {
    const image = document.createElement("img");
    image.src = formInfo.image.value;
    ramenMenu.append(image);

    //Listen for image click to add form information to the front
    image.addEventListener("click", function(e) {
        const img = ramenDetail.querySelector("img")
        img.src = formInfo.image.value;
        img.alt = formInfo.name.value;

        const name = ramenDetail.querySelector("h2");
        name.textContent = formInfo.name.value;

        const restaurant = ramenDetail.querySelector("h3");
        restaurant.textContent = formInfo.restaurant.value;

        ramenRating.textContent = formInfo.rating.value;
        ramenComment.textContent = formInfo["new-comment"].value;
    })
}