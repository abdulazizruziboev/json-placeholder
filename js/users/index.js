const loaderEl = document.querySelector(".users-loading");
const usersWrapperBoxEl = document.querySelector(".users-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const userCardTemplateEl = document.querySelector("#user-card-template");
const usersShowMoreButtonEl = document.querySelector(".show-more-results-button");

let users = [];
let count = 12;

loadUsers();

async function loadUsers() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        users = data;
        writeUsersToUi(count);
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
            hideShowMoreUsersButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hideUsersWrapper (hidden) {
    if(usersWrapperBoxEl) 
        if(hidden) usersWrapperBoxEl.classList.add("hidden");
        else usersWrapperBoxEl.classList.remove("hidden");
}

function hideShowMoreUsersButton (hidden) {
    if(usersShowMoreButtonEl) 
        if(hidden) usersShowMoreButtonEl.classList.add("hidden");
        else usersShowMoreButtonEl.classList.remove("hidden");
}

function writeUsersToUi(to) {
    hideUsersWrapper(false)
    hideShowMoreUsersButton(users.length <= to);
    usersWrapperBoxEl.innerHTML = null;
    users.slice(0,to).forEach(user=>{
        const card = userCardTemplateEl.cloneNode(true).content;
        const name = card.querySelector(".user-name"); 
        const username = card.querySelector(".user-username"); 
        const email = card.querySelector(".user-email"); 
        const phone = card.querySelector(".user-phone"); 
        if(name) name.textContent = user?.name ?? "N/A";
        if(username) username.textContent = user?.username ?? "N/A";
        if(email) email.textContent = user?.email ?? "N/A";
        if(phone) phone.textContent = user?.phone ?? "N/A";
        usersWrapperBoxEl.appendChild(card);
    }); 

}

usersShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writeUsersToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});