const loaderEl = document.querySelector(".albums-loading");
const albumsWrapperBoxEl = document.querySelector(".albums-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const albumCardTemplateEl = document.querySelector("#album-card-template");
const albumsShowMoreButtonEl = document.querySelector(".show-more-results-button");

let albums = [];
let count = 20;

loadAlbums();

async function loadAlbums() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/albums");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        albums = data;
        writeAlbumsToUi(count);
    } else {
        hideResultsNotAvailable(false);
    }
} catch (error) {
    console.error(error);
    hideLoader(true);
    hideResultsNotAvailable(true);
    hideSomethingWrong(false);   
}
}

function hideLoader(hidden) {
    if(loaderEl) {
        if(hidden) {
            loaderEl.classList.add("hidden");
        } else {
            loaderEl.classList.remove("hidden");
        }
    }
}

function hideResultsNotAvailable(hidden) {
    if(resultsNotAvailableBoxEl) 
        if(hidden) resultsNotAvailableBoxEl.classList.add("hidden");
        else resultsNotAvailableBoxEl.classList.remove("hidden");
}

function hideSomethingWrong (hidden) {
    if(somethingWrongBoxEl) 
        if(hidden) {
            somethingWrongBoxEl.classList.add("hidden");
            hideShowMoreAlbumsButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hideAlbumsWrapper (hidden) {
    if(albumsWrapperBoxEl) 
        if(hidden) albumsWrapperBoxEl.classList.add("hidden");
        else albumsWrapperBoxEl.classList.remove("hidden");
}

function hideShowMoreAlbumsButton (hidden) {
    if(albumsShowMoreButtonEl) 
        if(hidden) albumsShowMoreButtonEl.classList.add("hidden");
        else albumsShowMoreButtonEl.classList.remove("hidden");
}

function writeAlbumsToUi(to) {
    hideAlbumsWrapper(false)
    hideShowMoreAlbumsButton(albums.length <= to);
    albumsWrapperBoxEl.innerHTML = null;
    albums.slice(0,to).forEach(album=>{
        const card = albumCardTemplateEl.cloneNode(true).content;
        const title = card.querySelector(".album-title"); 
        if(title) title.textContent = album?.title ?? "N/A";
        albumsWrapperBoxEl.appendChild(card);
    }); 

}

albumsShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writeAlbumsToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});