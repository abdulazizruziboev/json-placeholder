const loaderEl = document.querySelector(".photos-loading");
const photosWrapperBoxEl = document.querySelector(".photos-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const photoCardTemplateEl = document.querySelector("#photo-card-template");
const photosShowMoreButtonEl = document.querySelector(".show-more-results-button");

let photos = [];
let count = 20;

loadPhotos();

async function loadPhotos() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/photos");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        photos = data;
        writePhotosToUi(count);
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
            hideShowMorePhotosButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hidePhotosWrapper (hidden) {
    if(photosWrapperBoxEl) 
        if(hidden) photosWrapperBoxEl.classList.add("hidden");
        else photosWrapperBoxEl.classList.remove("hidden");
}

function hideShowMorePhotosButton (hidden) {
    if(photosShowMoreButtonEl) 
        if(hidden) photosShowMoreButtonEl.classList.add("hidden");
        else photosShowMoreButtonEl.classList.remove("hidden");
}

function writePhotosToUi(to) {
    hidePhotosWrapper(false)
    hideShowMorePhotosButton(photos.length <= to);
    photosWrapperBoxEl.innerHTML = null;
    photos.slice(0,to).forEach(photo=>{
        const card = photoCardTemplateEl.cloneNode(true).content;
        const image = card.querySelector(".photo-image");
        const title = card.querySelector(".photo-title"); 
        if(image) image.src = photo?.url;
        if(image) image.alt = photo?.title;
        if(title) title.textContent = photo?.title ?? "N/A";
        photosWrapperBoxEl.appendChild(card);
    }); 

}

photosShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writePhotosToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});