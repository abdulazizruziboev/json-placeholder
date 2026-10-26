const loaderEl = document.querySelector(".posts-loading");
const postsWrapperBoxEl = document.querySelector(".posts-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const postCardTemplateEl = document.querySelector("#post-card-template");
const postsShowMoreButtonEl = document.querySelector(".show-more-results-button");

let posts = [];
let count = 12;

loadPosts();

async function loadPosts() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        posts = data;
        writePostsToUi(count);
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
            hideShowMorePostsButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hidePostsWrapper (hidden) {
    if(postsWrapperBoxEl) 
        if(hidden) postsWrapperBoxEl.classList.add("hidden");
        else postsWrapperBoxEl.classList.remove("hidden");
}

function hideShowMorePostsButton (hidden) {
    if(postsShowMoreButtonEl) 
        if(hidden) postsShowMoreButtonEl.classList.add("hidden");
        else postsShowMoreButtonEl.classList.remove("hidden");
}

function writePostsToUi(to) {
    hidePostsWrapper(false)
    hideShowMorePostsButton(posts.length <= to);
    postsWrapperBoxEl.innerHTML = null;
    posts.slice(0,to).forEach(post=>{
        const card = postCardTemplateEl.cloneNode(true).content;
        const title = card.querySelector(".post-title"); 
        const text = card.querySelector(".post-text"); 
        if(title) title.textContent = post?.title ?? "N/A";
        if(text) text.textContent = post?.body ?? "N/A";
        postsWrapperBoxEl.appendChild(card);
    }); 

}

postsShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writePostsToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});