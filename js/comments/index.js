const loaderEl = document.querySelector(".comments-loading");
const commentsWrapperBoxEl = document.querySelector(".comments-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const commentCardTemplateEl = document.querySelector("#comment-card-template");
const commentsShowMoreButtonEl = document.querySelector(".show-more-results-button");

let comments = [];
let count = 20;

loadComments();

async function loadComments() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/comments");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        comments = data;
        writeCommentsToUi(count);
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
            hideShowMoreCommentsButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hideCommentsWrapper (hidden) {
    if(commentsWrapperBoxEl) 
        if(hidden) commentsWrapperBoxEl.classList.add("hidden");
        else commentsWrapperBoxEl.classList.remove("hidden");
}

function hideShowMoreCommentsButton (hidden) {
    if(commentsShowMoreButtonEl) 
        if(hidden) commentsShowMoreButtonEl.classList.add("hidden");
        else commentsShowMoreButtonEl.classList.remove("hidden");
}

function writeCommentsToUi(to) {
    hideCommentsWrapper(false)
    hideShowMoreCommentsButton(comments.length <= to);
    commentsWrapperBoxEl.innerHTML = null;
    comments.slice(0,to).forEach(comment=>{
        const card = commentCardTemplateEl.cloneNode(true).content;
        const name = card.querySelector(".comment-name");
        const email = card.querySelector(".comment-email"); 
        const text = card.querySelector(".comment-text"); 
        if(name) name.textContent = comment?.name ?? "N/A";
        if(email) email.textContent = comment?.email ?? "N/A";
        if(text) text.textContent = comment?.body ?? "N/A";
        commentsWrapperBoxEl.appendChild(card);
    }); 

}

commentsShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writeCommentsToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});