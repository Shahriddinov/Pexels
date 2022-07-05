const API_KEY = '563492ad6f917000010000011bb489e4886e4d84b2bbe41c4ad422e6';
const input = document.querySelector('input');
const formBtn = document.querySelector('.search_btn');
let searchText = "";
let search = false

async function defaultPhotos() {
    const data = await fetch(`https://api.pexels.com/v1/curated`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API_KEY
        }
    })
    const response = await data.json()
    console.log(response)
    displayImages(response)
}

function displayImages(response) {
    response.photos.forEach((image) => {
        const photoDiv = document.createElement("div")
        photoDiv.innerHTML = `
            <a href=${image.src.large} target="_blank">
            <img class="image" src=${image.src.large} alt=${image.url}>
           </a>
            <figcaption class="caption"> 📷: ${image.photographer}</figcaption>`;
        document.querySelector(".display_images").appendChild(photoDiv)
    })
}

async function searchPhotos(query) {
    const data = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            Authorization: API_KEY
        }
    })
    const response = await data.json()
    console.log(response)
    displayImages(response)
}

input.addEventListener('input', (e) => {
    e.preventDefault();
    searchText = e.target.value;
})

formBtn.addEventListener('click', ()=>{
    if (input.value === ""){
        document.querySelector('.alert').innerHTML= "Empty search! Plz enter value ..."
    }else {
        document.querySelector('.alert').innerHTML="";
        clear();
        search=true;
        searchPhotos(searchText)
    }
})
function clear() {
document.querySelector('.display_images').innerHTML =""
}

defaultPhotos();
