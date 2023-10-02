const formEl= document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");
const accessKey = '5JMgkytBsUDpTAHdgA9w6oCdrAm5q8rZDsXdNY85m4E';

let inputData = "";
let page = 1;

async function searchImages(){
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;

    if(page === 1)
{
    searchResults.innerHTML = "";
}

results.forEach((result)=>{
    
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add("search-result");

    const imageLink = document.createElement('a');
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    const image = document.createElement('img')
    image.src = result.urls.small;
    image.alt = result.alt_description;
    imageLink.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);

});
page++;
if (page > 1)
{
    showMore.style.display = "block";
}}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", (event) =>{
    searchImages();
});