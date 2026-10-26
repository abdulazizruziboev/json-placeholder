const loaderEl = document.querySelector(".todos-loading");
const todosWrapperBoxEl = document.querySelector(".todos-wrapper-box");
const resultsNotAvailableBoxEl = document.querySelector(".results-not-available-box");
const somethingWrongBoxEl = document.querySelector(".something-wrong-box");
const todoCardTemplateEl = document.querySelector("#todo-card-template");
const todosShowMoreButtonEl = document.querySelector(".show-more-results-button");

let todos = [];
let count = 20;

loadTodos();

async function loadTodos() {
try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if(!response.ok) throw new Error("Network error!");
    
    const data = await response.json();
    hideLoader(true);
    if(Array.isArray(data) && data.length>0) {
        todos = data;
        writeTodosToUi(count);
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
            hideShowMoreTodosButton(true);
        } else somethingWrongBoxEl.classList.remove("hidden");
}

function hideTodosWrapper (hidden) {
    if(todosWrapperBoxEl) 
        if(hidden) todosWrapperBoxEl.classList.add("hidden");
        else todosWrapperBoxEl.classList.remove("hidden");
}

function hideShowMoreTodosButton (hidden) {
    if(todosShowMoreButtonEl) 
        if(hidden) todosShowMoreButtonEl.classList.add("hidden");
        else todosShowMoreButtonEl.classList.remove("hidden");
}

function writeTodosToUi(to) {
    hideTodosWrapper(false)
    hideShowMoreTodosButton(todos.length <= to);
    todosWrapperBoxEl.innerHTML = null;
    todos.slice(0,to).forEach(todo=>{
        const card = todoCardTemplateEl.cloneNode(true).content;
        const title = card.querySelector(".todo-title"); 
        const completed = card.querySelector(".todo-completed"); 
        if(title) title.textContent = todo?.title ?? "N/A";
        if(completed) completed.textContent = todo?.completed ? "Completed" : "Not completed" ;
        todosWrapperBoxEl.appendChild(card);
    }); 

}

todosShowMoreButtonEl.addEventListener("click",()=>{
    count+=10;
    writeTodosToUi(count);
});

window.addEventListener("error", () => {
    hideSomethingWrong(false);
});